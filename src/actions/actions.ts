'use server'

import { auth } from "@/auth";
import { db } from "@/db"
import { Order, OrderItem, PreOrderPreview, Product, SellerDesign, Store, User, UserType } from "@prisma/client";

  // get the auth user
export async function getUser() {
  try {
      const session = await auth()
      if(!session) return
      const user = await db.user.findUnique({
        where:{ id : session.user.id}
      })
      return user
  } catch (error) {
    console.log(error)
    return
    
  }
  
}


// get user by type 
export async function getUsersByType() {
  try {
    const users = await db.user.findMany({
      where: {
        userType: {
          in: [UserType.SELLER, UserType.USER]
        }
      }
    });
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
}

// delete user by id 
export async function deleteUserById(userId : string) {
  try {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error; // Rethrow the error if you want to handle it further up the call stack
  }
}


// get the categories
export async function getAllCategories() {
  try {
    const categories = await db.category.findMany({
      include: {
        colors: true,
        sizes: true,
        frontBorders: true,
        backBorders: true,
      },
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

// returns an array of all the available categories 

export async function getAllPodProductsCategories() {
  try {
    const categories = await db.product.findMany({
      where : {isProductAccepted : true},
      select: {
        category: true,
      },
      distinct: ['category']
    });
    return categories.map(product => product.category);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    throw error;
  }
}

// get categorie by id
export async function getCategorieById(catId : string) {
  try {
    const categorie = await db.category.findUnique({
      where: { id: catId },
      include: {
        colors: true,
        sizes: true,
        frontBorders: true,
        backBorders: true,
      },
    })
    return categorie
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}


// get seller Store by userId
export async function getStoreByUserId(userId : string) {
  try {
    const store = await db.store.findUnique({
      where: {
        userId: userId
      },
      include: {
        products: true,
        designs: true,
      },
    });

    if (!store) {
      throw new Error('Store not found for the given userId');
    }

    return store;
  } catch (error) {
    console.error('Error fetching store:', error);
    throw error;
  }
}




export async function fetchOrdersByStoreId(storeId: string) {

  try {
    // Step 1: Fetch orders with order items related to products of the store
    const orders = await db.order.findMany({
      where: {
        orderItems: {
          some: {
            product: {
              storeId: storeId,
            },
          },
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.log(error)
  }
}




// Helper function to check if the design of an item exists in the store
async function checkDesignInStore(orderItemId: string, storeId: string) {
  try {
    // Fetch the order item with its related designs
    const orderItem = await db.orderItem.findUnique({
      where: { id: orderItemId },
      include: {
        frontsellerDesign: true,
        backsellerDesign: true,
      },
    });

    // If the order item or designs do not exist, return false
    if (!orderItem || (!orderItem.frontsellerDesign && !orderItem.backsellerDesign)) {
      return false;
    }

    // Check if the design's store ID matches the provided store ID
    if ((orderItem.frontsellerDesign && orderItem.frontsellerDesign.storeId === storeId) ||
        (orderItem.backsellerDesign && orderItem.backsellerDesign.storeId === storeId)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking design in store:", error);
    return false;
  }
}




// get the orders of the store products
interface Orderwithitems extends Order {
  orderItems: OrderItemwithdesigns[];
}
interface OrderItemwithdesigns extends OrderItem {
  frontDesignName?: string | null;
  backDesignName?: string | null;
}
export async function getDesignsOrdersForStore(storeId: string, userId: string) {

  // Fetch the store based on storeId and userId
  const store = await db.store.findUnique({
    where: {  id: storeId, userId: userId  },
    include: {
      designs: true,
    },
  });

  // Check if the store exists and belongs to the user
  if (!store) {
    throw new Error("Store not found for the given user");
  }

  // Extract design IDs from the store's designs
  const designIds = store.designs.map(design => design.id);

  // Fetch orders containing any of the store's designs
  const orders = await db.order.findMany({
    where: {
      orderItems: {
        some: {
          OR: [
            {
              frontsellerDesignId: {
                in: designIds,
              },
            },
            {
              backsellerDesignId: {
                in: designIds,
              },
            }
          ]
        },
      },
    },
    include: {
      orderItems: {
        include: {
          frontsellerDesign: true,
          backsellerDesign: true,
        },
      },
    },
  });

  // Filter and format orders
  const filteredOrders = await Promise.all(orders.map(async order => {
    const filteredOrderItems = await Promise.all(order.orderItems.map(async item => {
      const isFrontDesignInStore = item.frontsellerDesignId ? await checkDesignInStore(item.id, storeId) : false;
      const isBackDesignInStore = item.backsellerDesignId ? await checkDesignInStore(item.id, storeId) : false;

      if (isFrontDesignInStore && item.frontsellerDesign?.isDesignForSale) {
        return {
          ...item,
          frontDesignName: item.frontsellerDesign.name,
          backDesignName: item.backsellerDesign ? item.backsellerDesign.name : null,
        };
      } else if (isBackDesignInStore && item.backsellerDesign?.isDesignForSale) {
        return {
          ...item,
          frontDesignName: item.frontsellerDesign ? item.frontsellerDesign.name : null,
          backDesignName: item.backsellerDesign.name,
        };
      } else {
        return null;
      }
    }));

    return {
      ...order,
      orderItems: filteredOrderItems.filter(item => item !== null),
    };
  }));

  return filteredOrders.filter(order => order.orderItems.length > 0) as Orderwithitems[];
}





// get the orders of the store design
export async function getDesignOrders(storeId: string, userId: string) {
  const store = await db.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  const orders = await db.order.findMany({
    where: {
      userId: userId,
      orderItems: {
        some: {
          OR: [
            {
              frontsellerDesign: {
                storeId: storeId,
                isDesignForSale: true,
              },
            },
            {
              backsellerDesign: {
                storeId: storeId,
                isDesignForSale: true,
              },
            },
          ],
        },
      },
    },
    include: {
      orderItems: {
        include: {
          frontsellerDesign: true,
          backsellerDesign: true,
        },
      },
    },
  });

  return orders;
}





// get the deisgns that were ordered
interface OrderedDesign extends SellerDesign {
  orderCount: number;
  totalOrderedQuantity: number; // New field for total ordered quantity

}
export async function getOrderedDesignsByStoreId(storeId: string): Promise<OrderedDesign[]> {
  try {
    // Find all distinct designs from the specified store that have valid orders
    const orderedDesigns = await db.sellerDesign.findMany({
      where: {
        storeId: storeId,
        isDesignForSale: true,
        OR: [
          { frontOrders: { some: {
            order: {
              status: {
                not: 'CANCELED'
              },
              type: {
                not: 'CANCELED'
              }
            }
          } } },
          { backOrders: { some: {
            order: {
              status: {
                not: 'CANCELED'
              },
              type: {
                not: 'CANCELED'
              }
            }
          } } } 
        ]
      },
      include: {
        frontOrders: {
          include: {
            order: true
          }
        },
        backOrders: {
          include: {
            order: true
          }
        }
      }
    });

    // Calculate the order count for each design
    const designsWithOrderCount = orderedDesigns.map(design => {
      // Filter orders to exclude those with CANCELED status or type
      const validFrontOrders = design.frontOrders.filter(orderItem =>
        orderItem.order.status !== 'CANCELED' && orderItem.order.type !== 'CANCELED'
      );

      const validBackOrders = design.backOrders.filter(orderItem =>
        orderItem.order.status !== 'CANCELED' && orderItem.order.type !== 'CANCELED'
      );

      // Calculate total ordered quantity for the product
      const totalFrontOrderedQuantity = validFrontOrders.reduce((total, orderItem) => {
        return total + orderItem.quantity; // Accumulate quantity from each order item
      }, 0);

       // Calculate total ordered quantity for the product
       const totalBackOrderedQuantity = validBackOrders.reduce((total, orderItem) => {
        return total + orderItem.quantity; // Accumulate quantity from each order item
      }, 0);


      return {
        ...design,
        orderCount: validFrontOrders.length + validBackOrders.length, // Count the number of valid orders for the design
        totalOrderedQuantity: totalFrontOrderedQuantity + totalBackOrderedQuantity // Count the number of valid orders for the design

      };
    });

    return designsWithOrderCount;
  } catch (error) {
    console.error('Error fetching ordered designs for store:', error);
    throw error; // Handle or rethrow as needed
  }
}




// get the products that were ordered
interface OrderedProduct extends Product {
  orderCount: number;
  totalOrderedQuantity: number; // New field for total ordered quantity
}
export async function getOrderedProductsByStoreId(storeId: string): Promise<OrderedProduct[]> {
  try {
    // Find all distinct products from the specified store that have valid orders
    const orderedProducts = await db.product.findMany({
      where: {
        storeId: storeId,
        order: {
          some: {
            order: {
              status: {
                not: 'CANCELED'
              },
              type: {
                not: 'CANCELED'
              }
            }
          }
        }
      },
      include: {
        order: {
          include: {
            order: true // Include related orders
          }
        }
      }
    });

    // Calculate the order count for each product
    const productsWithOrderCount = orderedProducts.map(product => {
      // Filter orders to exclude those with CANCELED status or type
      const validOrders = product.order.filter(orderItem => 
        orderItem.order.status !== 'CANCELED' && orderItem.order.type !== 'CANCELED'
      );

      // Calculate total ordered quantity for the product
      const totalOrderedQuantity = validOrders.reduce((total, orderItem) => {
        return total + orderItem.quantity; // Accumulate quantity from each order item
      }, 0);

      return {
        ...product,
        orderCount: validOrders.length,
        totalOrderedQuantity: totalOrderedQuantity
      };
      });

    return productsWithOrderCount;
  } catch (error) {
    console.error('Error fetching ordered products for store:', error);
    throw error; // Handle or rethrow as needed
  }
}


// get all orders 
export async function getAllOrder(){
  try {
    const order = await db.order.findMany({
      include: {
        user: true, // Include the user relation
        orderItems: true // Include the orderItems relation
      },
    });
      return order
      } catch (error) {
        console.log(error)
        return null
      }
    }

  // get order by orderId 
  export async function getOrder(orderId: string): Promise<Order | null> {
    try {
      const order = await db.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          user: true, // Include the user relation
          orderItems: true // Include the orderItems relation
        },
      });
        return order
        } catch (error) {
          console.log(error)
          return null
        }
      }







// return the products of the given ids
export async function getProductsByIds(productIds : string[]) {
  try {
    // Fetch products where the id is in the list of productIds
    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds
        }
      },
      include : {
        store : true
      }
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}






interface Productswithstore extends Product {
  store : Store
}
  // fetch all products
export async function fetchProducts(): Promise<Productswithstore[] | null> {
  try {
    const products = await db.product.findMany({
      where : {isProductAccepted : true},
      include : {
        store : true
      }
    });
    if(!products) return null
    return products;
  } catch (error) {
    console.log(error)
    return null
  }
  }


  


  // for the new released products
 export async function fetchNewProducts(): Promise<Productswithstore[] | null> {
    try {
      const products = await db.product.findMany({
        where : {isProductAccepted : true},
        orderBy: {
          createdAt: 'desc'
        },
        include : {
          store : true
        }
      });
  
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  }


    // for the best selling products
 export async function fetchBestSellingProducts(): Promise<Productswithstore[] | null> {
  try {
    const products = await db.product.findMany({
      where:{ topSales : true , isProductAccepted : true},
      include : {
        store : true
      }
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}


  // fetch products by category
export async function fetchProductsByCategory(category : string) {
    try {
      const products = await db.product.findMany({
        where: {
          category: category,
          isProductAccepted : true
        },
        include : {
          store : true
        }
      });
      return products;
    } catch (error) {
      console.error(`Error fetching products by category: ${error}`);
      throw error;
    } 
  }
















  // fetch design by id 

  export async function fetchDesignById(designId : string) {

    try {
      const design = await db.sellerDesign.findFirst({
        where: { id: designId }
      });
  
      return design?.imageUrl
    } catch (error) {

      console.log(error)
      return null
      
    }
  }









        // fav list functions

// check if a product exists in a user fav list
export async function checkProductInFavList(productId: string, userId: string) {
  try {
    // Find the user's favorite list including products
    const favList = await db.favList.findUnique({
      where: {
        userId: userId,
      },
      include: {
        products: true,
      },
    });

    if (!favList || !favList.products) {
      // If the favorite list doesn't exist or it has no products, the product can't be in it
      return false;
    }

    // Check if the product exists in the favorite list items
    const isProductInFavList = favList.products.some(product => product.id === productId);

    return isProductInFavList;
  } catch (error) {
    console.error("Error checking product in favList:", error);
    throw error; // Propagate the error for handling elsewhere
  }
}


  // add product to a user fav list :
  export async function addProductToFavList(productId: string, userId: string) {
    try {
      // Find or create a favorite list for the user
      let favList = await db.favList.findFirst({
        where: {
          userId: userId,
        },
      });
  
      if (!favList) {
        favList = await db.favList.create({
          data: {
            userId: userId,
          },
        });
      }
  
      const product = await db.product.findUnique({ where: { id: productId } });
      
      if (product && favList) {
        await db.favList.update({
          where: { id: favList.id },
          data: {
            products: { connect: { id: productId } }
          }
        });

        return true
      }
  
      return false
    } catch (error) {
      console.error("Error adding product to favList:", error);
      return null;
    }
  }


  // remove product from user's fav list
export async function removeProductFromFavList(productId: string, userId: string) {
  try {
    // Find the user's favorite list including products
    const favList = await db.favList.findUnique({
      where: {
        userId: userId,
      },
      include: {
        products: true,
      },
    });

    if (!favList || !favList.products) {
      // If the favorite list doesn't exist or it has no products, nothing to remove
      return false;
    }

    // Check if the product exists in the favorite list items
    const productIndex = favList.products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      // If the product is not found in the favorite list, return false
      return false;
    }

    // Remove the product from the favorite list
    await db.favList.update({
      where: { id: favList.id },
      data: {
        products: {
          disconnect: { id: productId }
        }
      }
    });

    return true;
  } catch (error) {
    console.error("Error removing product from favList:", error);
    throw error; // Propagate the error for handling elsewhere
  }
}







        // fav list functions for frip products

// check if a product exists in a user fav list
export async function checkFripProductInFavList(productId: string, userId: string) {
  try {
    // Find the user's favorite list including products
    const favList = await db.fripFavList.findUnique({
      where: {
        userId: userId,
      },
      include: {
        products: true,
      },
    });

    if (!favList || !favList.products) {
      // If the favorite list doesn't exist or it has no products, the product can't be in it
      return false;
    }

    // Check if the product exists in the favorite list items
    const isProductInFavList = favList.products.some(product => product.id === productId);

    return isProductInFavList;
  } catch (error) {
    console.error("Error checking product in favList:", error);
    throw error; // Propagate the error for handling elsewhere
  }
}


  // add product to a user fav list :
  export async function addFripProductToFavList(productId: string, userId: string) {
    try {
      // Find or create a favorite list for the user
      let favList = await db.fripFavList.findFirst({
        where: {
          userId: userId,
        },
      });
  
      if (!favList) {
        favList = await db.fripFavList.create({
          data: {
            userId: userId,
          },
        });
      }
  
      const product = await db.fripProducts.findUnique({ where: { id: productId } });
      
      if (product && favList) {
        await db.fripFavList.update({
          where: { id: favList.id },
          data: {
            products: { connect: { id: productId } }
          }
        });

        return true
      }
  
      return false
    } catch (error) {
      console.error("Error adding product to favList:", error);
      return null;
    }
  }


  // remove product from user's fav list
export async function removeFripProductFromFavList(productId: string, userId: string) {
  try {
    // Find the user's favorite list including products
    const favList = await db.fripFavList.findUnique({
      where: {
        userId: userId,
      },
      include: {
        products: true,
      },
    });

    if (!favList || !favList.products) {
      // If the favorite list doesn't exist or it has no products, nothing to remove
      return false;
    }

    // Check if the product exists in the favorite list items
    const productIndex = favList.products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      // If the product is not found in the favorite list, return false
      return false;
    }

    // Remove the product from the favorite list
    await db.fripFavList.update({
      where: { id: favList.id },
      data: {
        products: {
          disconnect: { id: productId }
        }
      }
    });

    return true;
  } catch (error) {
    console.error("Error removing product from favList:", error);
    throw error; // Propagate the error for handling elsewhere
  }
}








        // cart functions

// check if a product exists in a user cart :
export async function checkProductInCart(productId: string , userId: string): Promise<boolean> {
  try {
    // Find the user's cart and include selectedProducts
    const userCart = await db.cart.findUnique({
      where: { userId: userId },
      include: { selectedProducts: true },
    });

    // If user has no cart or cart is empty, return false
    if (!userCart || userCart.selectedProducts.length === 0) {
      return false;
    }

    // Check if the product exists in the user's cart
    const existingProduct = userCart.selectedProducts.some(product => product.productId === productId);

    return existingProduct;

  } catch (error) {
    console.error('Error checking product in cart:', error);
    throw error; // Throw error for the caller to handle
  }
}


// add product to a user cart : 
export async function addProductToCart( 
  productId: string ,
  userId: string,
  price:number,
  category:string,
  size : string,
  color : string,
  quantity : number,
  productImgs : string[]


): Promise<boolean | null> {
  try {

    // Create or find user's cart
    let userCart = await db.cart.findUnique({
      where: { userId: userId },
    });

    if (!userCart) {
      userCart = await db.cart.create({
        data: {
          userId: userId,
        },
      });
    }

    const user = await db.user.findUnique({
      where: { id: userId } , 
      include : {
        cart : {
          include : {
            selectedProducts : true
          }
        }
      }
    })
    

    // Check if product with productId already exists in the cart
    const existingCartProduct = user?.cart?.selectedProducts.find(
      (product) => (product.productId === productId && product.category === category
        && product.size === size && product.color === color
        && product.quantity === quantity
        && product.price === price
      )
    );

    if(existingCartProduct) return false


    // Add product to the cart
    await db.cartProduct.create({
      data: {
        productId: productId,
        cartId: userCart.id,
        price:price,
        quantity:quantity,
        color:color,
        size:size,
        category:category,
        productImg: productImgs,
      },
    });

    return true; // Successfully added product to cart
  } catch (error) {
    console.error(`Error adding product to cart for user ${userId}:`, error);
    return null; // Handle error as per your application's needs
  }
}



        // cart functions frip schema

// check if a product exists in a user cart :
export async function checkFripProductInCart(productId: string , userId: string): Promise<boolean> {
  try {
    // Find the user's cart and include selectedProducts
    const userCart = await db.fripCart.findUnique({
      where: { userId: userId },
      include: { selectedProducts: true },
    });

    // If user has no cart or cart is empty, return false
    if (!userCart || userCart.selectedProducts.length === 0) {
      return false;
    }

    // Check if the product exists in the user's cart
    const existingProduct = userCart.selectedProducts.some(product => product.productId === productId);

    return existingProduct;

  } catch (error) {
    console.error('Error checking product in cart:', error);
    throw error; // Throw error for the caller to handle
  }
}


// add product to a user cart : 
export async function addFripProductToCart( 
  productId: string ,
  userId: string,
  price:number,
  category:string,
  size : string,
  productImgs : string[]


): Promise<boolean | null> {
  try {

    // Create or find user's cart
    let userCart = await db.fripCart.findUnique({
      where: { userId: userId },
    });

    if (!userCart) {
      userCart = await db.fripCart.create({
        data: {
          userId: userId,
        },
      });
    }

    const user = await db.user.findUnique({
      where: { id: userId } , 
      include : {
        fripCart : {
          include : {
            selectedProducts : true
          }
        }
      }
    })
    

    // Check if product with productId already exists in the cart
    const existingCartProduct = user?.fripCart?.selectedProducts.find(
      (product) => product.productId === productId
    );

    if(existingCartProduct) return false


    // Add product to the cart
    await db.cartFripProduct.create({
      data: {
        productId: productId,
        cartId: userCart.id,
        price:price,
        size:size,
        category:category,
        productImg: productImgs,
      },
    });

    return true; // Successfully added product to cart
  } catch (error) {
    console.error(`Error adding product to cart for user ${userId}:`, error);
    return null; // Handle error as per your application's needs
  }
}











//send notification to a store:
export async function createNotification(storeId : string, content : string, sender : string) {
  try {
    const notification = await db.notification.create({
      data: {
        storeId: storeId,
        content: content,
        sender: sender,
      },
    });
    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false
  }
}

//send notification to all stores:
export async function createNotificationForAllStores(content : string, sender : string) {
  try {
    // Fetch all store IDs
    const stores = await db.store.findMany({
      select: {
        id: true,
      },
    });

    // Prepare notification data for each store
    const notifications = stores.map(store => ({
      storeId: store.id,
      content: content,
      sender: sender,
    }));

    // Create notifications in bulk
    const createdNotifications = await db.notification.createMany({
      data: notifications,
    });

    return true;
  } catch (error) {
    console.error('Error creating notifications for all stores:', error);
    return false
  }
}

//return unreded notififcations for a store
export async function getUnreadNotificationsForStore(storeId : string) {
  try {
    const unreadNotifications = await db.notification.findMany({
      where: {
        storeId: storeId,
        isViewed: false,
      },
    });

    return unreadNotifications;
  } catch (error) {
    console.error('Error fetching unread notifications:', error);
    throw error;
  }
}


//get the platform model
export async function getPlatform(userId : string) {

  const platform = await db.platform.findUnique({
    where: {id : "a" , userId : userId}
  })

  return platform

}

// get the count infos for the admin dashboard :
export async function getTotalCounts() {
  const [
    userCount, 
    productCount, 
    storeCount, 
    sellerDesignCount , 
    awaitingActionProductCount,
    awaitingActionDesignCount,
  ] = await Promise.all([
    db.user.count(),
    db.product.count(),
    db.store.count(),
    db.sellerDesign.count({
      where: {isDesignForSale : true}
    }),
    db.product.count({
      where : {isProductAccepted : false , isProductRefused : false}
    }),
    db.sellerDesign.count({
      where : {isDesignAccepted : false , isDesignRefused : false , isDesignForSale : true} 
    })

  ])


  return {
    userCount,
    productCount,
    storeCount,
    sellerDesignCount,
    awaitingActionProductCount,
    awaitingActionDesignCount
  };
}

// get the count infos for the admin dashboard side bar :
export async function getSideBarTotalCounts() {
  const [
    printedOrdersCount,
    awaitingActionProductCount,
    awaitingActionDesignCount,
  ] = await Promise.all([
    db.order.count({
      where : {printed : true}
    }),
    db.product.count({
      where : {isProductAccepted : false , isProductRefused : false}
    }),
    db.sellerDesign.count({
      where : {isDesignAccepted : false , isDesignRefused : false , isDesignForSale : true} 
    })

  ])


  return {
    printedOrdersCount,
    awaitingActionProductCount,
    awaitingActionDesignCount
  };
}


// get the count for factory dashboard
export async function getFactoryDashboardCounts() {
  const [confirmedOrdersCount, deliveredOrdersCount, canceledOrdersCount , totalOrdersCount] = await Promise.all([
    db.order.count({where : { type : "CONFIRMED"}}),
    db.order.count({where : { status : "DELIVERED"}}),
    db.order.count({where : { status : "CANCELED"}}),
    db.order.count()
  ]);

  return {
    confirmedOrdersCount,
    deliveredOrdersCount,
    canceledOrdersCount,
    totalOrdersCount
  };
}

// get bacProducts only 9 products random
export async function getRandomBacProducts() {
  const randomBacProducts = await db.bacProducts.findMany({
    take: 9,
    orderBy: {
      createdAt: 'asc',
    },
  });

  return randomBacProducts;
}

// get frip products only 12 products random
export async function getRandomFripProducts() {
  const fripProducts = await db.fripProducts.findMany({
    take: 12,
    orderBy: {
      createdAt: 'asc',
    },
  });

  return fripProducts;
}



// returns an array of all the available categories from the FripProducts 

export async function getAllFripCategories() {
  try {
    const categories = await db.fripProducts.findMany({
      select: {
        category: true,
      },
      distinct: ['category']
    });
    return categories.map(product => product.category);
  } catch (error) {
    console.error("Error retrieving categories:", error);
    throw error;
  }
}

// returns an array of all the available brands from the FripProducts 

export async function getAllFripBrands() {
  try {
    const brands = await db.fripProducts.findMany({
      select: {
        brand: true,
      },
      distinct: ['brand']
    });
    return brands.map(product => product.brand);
  } catch (error) {
    console.error("Error retrieving brands:", error);
    throw error;
  }
}

  // fetch products by category
  export async function fetchFripProductsByCategory(category : string) {
    try {
      const products = await db.fripProducts.findMany({
        where: {
          category: category,
        },
      });
      return products;
    } catch (error) {
      console.error(`Error fetching products by category: ${error}`);
      throw error;
    } 
  }




  //return a list of strings containing categories, brands, and titles that start with the same characters as the given query
  export async function searchProducts(query: string) {
    try {
      const decodedQuery = decodeURIComponent(query).toLowerCase(); // Decode the URI-encoded query string and convert to lowercase

      // Fetch all products from the database
      const products = await db.fripProducts.findMany({
          select: {
              category: true,
              title: true,
              brand: true,
          },
      });

      // Filter products where category, title, or tags start with the query (case insensitive)
      const results: string[] = [];

      products.forEach((product) => {
          if (product.category.toLowerCase().startsWith(decodedQuery) || product.category.toLowerCase().includes(decodedQuery) ) {
              results.push(product.category);
          }
          if (product.title.toLowerCase().startsWith(decodedQuery) || product.title.toLowerCase().includes(decodedQuery)) {
              results.push(product.title);
          }
          if (product.brand.toLowerCase().startsWith(decodedQuery) || product.brand.toLowerCase().includes(decodedQuery)) {
            results.push(product.brand);
          }
      });

      // Deduplicate and return results
      const uniqueResults = [...new Set(results)]; // Remove duplicates

      return uniqueResults;
  } catch (error) {
      console.error('Error searching products:', error);
      throw error;
  }
}


// Return a list of strings containing categories, tags, and titles that start with the same characters as the given query
export async function searchPodProducts(query: string) {
  try {
      const decodedQuery = decodeURIComponent(query).toLowerCase(); // Decode the URI-encoded query string and convert to lowercase

      // Fetch all products from the database
      const products = await db.product.findMany({
        where : {isProductAccepted : true},
          select: {
              category: true,
              title: true,
              tags: true,
          },
      });

      // Filter products where category, title, or tags start with the query (case insensitive)
      const results: string[] = [];

      products.forEach((product) => {
          if (product.category.toLowerCase().startsWith(decodedQuery) || product.category.toLowerCase().includes(decodedQuery) ) {
              results.push(product.category);
          }
          if (product.title.toLowerCase().startsWith(decodedQuery) || product.title.toLowerCase().includes(decodedQuery) ) {
              results.push(product.title);
          }
          if (product.tags.some(tag => tag.toLowerCase().startsWith(decodedQuery)) || product.tags.some(tag => tag.toLowerCase().includes(decodedQuery))) {
              results.push(...product.tags.filter(tag => tag.toLowerCase().startsWith(decodedQuery)));
          }
      });

      // Deduplicate and return results
      const uniqueResults = [...new Set(results)]; // Remove duplicates

      return uniqueResults;
  } catch (error) {
      console.error('Error searching products:', error);
      throw error;
  }
}





















  
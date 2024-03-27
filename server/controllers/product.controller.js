import Products from '../models/products.js';
import { redis } from '../utils/redis.js'

export const getCategorisedProducts = async (req, res) => {
    try {
        // keywords for each category
        const cachedProducts = await redis.get('categorised_products');
        if (cachedProducts) {
            return res.status(200).json({
                success: true,
                categorizedProducts: JSON.parse(cachedProducts)
            })
        }

        const categories = [
            {
                category: "Clothes",
                subcategories: [
                    { name: "Shirt", keywords: ["shirt", "t-shirt", "tshirt", "top", "blouse", "tee", "polo", "tank top", "crop top"] },
                    { name: "Shorts_Jeans", keywords: ["shorts", "jeans", "pants", "trousers", "denim", "bottoms", "capris", "leggings", "cargo pants"] },
                    { name: "Jackets", keywords: ["jacket", "sweaters", "coat", "hoodie", "blazer", "outerwear", "windbreaker", "raincoat", "parka"] },
                    { name: "Dress_Frock", keywords: ["dress", "frock", "gown", "skirt", "maxi dress", "midi dress", "party dress", "cocktail dress", "summer dress"] }
                ]
            },
            {
                category: "Bags",
                subcategories: [
                    { name: "Shopping_Bag", keywords: ["shopping bag", "tote bag", "carryall", "reusable bag", "grocery bag", "canvas bag", "beach bag"] },
                    { name: "Gym_Backpack", keywords: ["gym", "backpack", "gym backpack", "sports bag", "duffel bag", "hydration pack", "backpack with laptop compartment"] },
                    { name: "Purse", keywords: ["purse", "handbag", "clutch", "crossbody bag", "shoulder bag", "satchel", "hobo bag", "bucket bag"] },
                    { name: "Wallet", keywords: ["wallet", "billfold", "cardholder", "money clip", "coin purse", "passport holder", "travel wallet", "zip-around wallet"] }
                ]
            },
            {
                category: "Jewelry",
                subcategories: [
                    { name: "Earrings", keywords: ["earrings", "studs", "hoops", "dangles", "ear cuffs", "earrings set", "chandelier earrings", "threader earrings"] },
                    { name: "Couple_Rings", keywords: ["couple rings", "wedding rings", "promise rings", "engagement rings", "eternity rings", "matching rings", "birthstone rings"] },
                    { name: "Necklace", keywords: ["necklace", "pendant", "choker", "chain", "statement necklace", "collar necklace", "locket necklace", "layered necklace"] }
                ]
            },
            {
                category: "Footwears",
                subcategories: [
                    { name: "Sports", keywords: ["sports shoes", "sneakers", "athletic footwear", "running shoes", "basketball shoes", "soccer cleats", "training shoes", "tennis shoes"] },
                    { name: "Formal", keywords: ["formal shoes", "dress shoes", "oxfords", "loafers", "derby shoes", "monk strap shoes", "wingtip shoes", "brogues"] },
                    { name: "Casual", keywords: ["casual shoes", "loafers", "slip-ons", "sneaker boots", "moccasins", "boat shoes", "espadrilles", "slides"] },
                    { name: "Safety_Shoes", keywords: ["safety shoes", "work boots", "steel-toe boots", "industrial footwear", "electric hazard boots", "slip-resistant shoes", "waterproof work boots"] }
                ]
            },
            {
                category: "Cosmetics",
                subcategories: [
                    { name: "Shampoo", keywords: ["shampoo", "cleanser", "hair wash", "hair care", "scalp treatment", "conditioner", "hair mask", "dry shampoo"] },
                    { name: "Sunscreen", keywords: ["sunscreen", "sunblock", "UV protection", "sun care", "sunscreen lotion", "SPF moisturizer", "sunscreen stick", "facial sunscreen"] },
                    { name: "Body_Wash", keywords: ["body wash", "shower gel", "cleansing gel", "body cleanser", "shower cream", "bar soap", "body scrub", "body oil"] },
                    { name: "Makeup_Kit", keywords: ["makeup kit", "cosmetics set", "beauty essentials", "makeup palette", "makeup collection", "makeup brushes", "makeup remover", "makeup organizer"] }
                ]
            },
            {
                category: "Glasses",
                subcategories: [
                    { name: "Sunglasses", keywords: ["sunglasses", "shades", "sunnies", "UV sunglasses", "polarized sunglasses", "aviator sunglasses", "cat-eye sunglasses", "oversized sunglasses"] },
                    { name: "Lenses", keywords: ["lenses", "contact lenses", "eyeglass lenses", "prescription lenses", "vision correction", "bifocal lenses", "color contact lenses", "toric lenses"] },
                    { name: "Body_Wash", keywords: ["body wash", "cleansing lotion", "facial cleanser", "skincare", "face wash", "makeup remover", "micellar water", "face toner"] },
                    { name: "Makeup_Kit", keywords: ["makeup kit", "cosmetics set", "beauty essentials", "makeup palette", "makeup collection", "eyeglass cleaner", "lens cleaning kit", "glasses case"] }
                ]
            },
            {
                category: "Perfume",
                subcategories: [
                    { name: "Cloths_Perfumes", keywords: ["cloths perfumes", "fabric fragrances", "scented clothes", "laundry fragrance", "linen spray", "fabric softener", "scent booster"] },
                    { name: "Deodorant", keywords: ["deodorant", "antiperspirant", "body spray", "roll-on deodorant", "spray deodorant", "natural deodorant", "clinical strength deodorant", "deodorant wipes"] }
                ]
            }
        ];


        // Initialize an object to store products for each category
        const categorizedProducts = {};

        // Iterate through each category
        for (const { category, subcategories } of categories) {

            // Initialize an array to store products for the current category
            categorizedProducts[category] = {};
            // categorizedProducts[category][subcategories] = [];

            // Iterate through each subcategory and its keywords
            for (const { name, keywords } of subcategories) {
                // Find products with keywords for the current subcategory
                // const products = await Products.find({ tags: { $in: keywords } });
                const productCount = await Products.countDocuments({ tags: { $in: keywords } });

                // Add products to the categorizedProducts object
                categorizedProducts[category][name] = productCount;
            }
        }
        // console.log(categorizedProducts)

        redis.set('categorised_products', JSON.stringify(categorizedProducts), 'EX', "1800")
        // Return the categorized products
        res.status(200).json({
            success: true,
            categorizedProducts
        });
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

export const newArrivalProducts = async (req, res) => {
    try {

        const cachedClothes = await redis.get('clothes');
        const cachedFootwears = await redis.get('footwears');
        const cachedAccessories = await redis.get('accessories');
        if (cachedClothes && cachedFootwears && cachedAccessories) {
            return res.status(200).json({
                success: true,
                clothes: JSON.parse(cachedClothes),
                footwears: JSON.parse(cachedFootwears),
                accessories: JSON.parse(cachedAccessories)
            })
        }

        const clothKeyWordsList = [
            "shirt", "t-shirt", "tshirt", "top", "blouse", "tee", "polo", "tank top", "crop top",
            "shorts", "jeans", "pants", "trousers", "denim", "bottoms", "capris", "leggings", "cargo pants",
            "jacket", "sweaters", "coat", "hoodie", "blazer", "outerwear", "windbreaker", "raincoat", "parka",
            "dress", "frock", "gown", "skirt", "maxi dress", "midi dress", "party dress", "cocktail dress", "summer dress"
        ]

        const footwearKeyWordsList = [
            "sports shoes", "sneakers", "athletic footwear", "running shoes", "basketball shoes", "soccer cleats", "training shoes", "tennis shoes",
            "formal shoes", "dress shoes", "oxfords", "loafers", "derby shoes", "monk strap shoes", "wingtip shoes", "brogues",
            "casual shoes", "loafers", "slip-ons", "sneaker boots", "moccasins", "boat shoes", "espadrilles", "slides",
            "safety shoes", "work boots", "steel-toe boots", "industrial footwear", "electric hazard boots", "slip-resistant shoes", "waterproof work boots"
        ]

        const accessoriesKeyWordsList = [
            "deodorant", "antiperspirant", "shades", "sunnies", "earrings", "studs", "phone",  "body spray", "roll-on deodorant", "spray deodorant", "natural deodorant", "clinical strength deodorant", "deodorant wipes",
            "wallet", "billfold", "cardholder", "money clip", "coin purse", "passport holder", "travel wallet", "zip-around wallet",
            "hoops", "dangles", "ear cuffs", "chandelier earrings", "threader earrings", "ipad", "laptop", "computer" ,
            "sunglasses", "UV sunglasses", "polarized sunglasses", "aviator sunglasses", "cat-eye sunglasses", "oversized sunglasses"
        ]

        const clothes = await Products.find({
            $or: [
                { productName: { $regex: clothKeyWordsList.join("|"), $options: 'i' } },
                {
                    $or: clothKeyWordsList.map(keyword => ({
                        tags: { $regex: new RegExp(keyword.split(" ").join("|"), "i") }
                    }))
                }
            ]
        }).limit(8);

        const footwears = await Products.find({
            $or: [
                { productName: { $regex: footwearKeyWordsList.join("|"), $options: 'i' } },
                {
                    $or: footwearKeyWordsList.map(keyword => ({
                        tags: { $regex: new RegExp(keyword.split(" ").join("|"), "i") }
                    }))
                }
            ]
        }).limit(8);

        const accessories = await Products.find({
            $or: [
                { productName: { $regex: accessoriesKeyWordsList.join("|"), $options: 'i' } },
                {
                    $or: accessoriesKeyWordsList.map(keyword => ({
                        tags: { $regex: new RegExp(keyword.split(" ").join("|"), "i") }
                    }))
                }
            ]
        }).limit(8);



        redis.set("clothes", JSON.stringify(clothes), 'EX', 1800)
        redis.set("footwears", JSON.stringify(footwears), 'EX', 1800)
        redis.set("accessories", JSON.stringify(accessories), 'EX', 1800)

        res.status(200).json({
            success: true,
            clothes,
            footwears,
            accessories
        })

    } catch (error) {
        console.log("Error retrieving new arrival products:", error);
        res.status(500).json(({
            success: false,
            message: "Internal Servel Error"
        }))
    }
}

export const dealOfDay = async (req, res) => {
    try {

        const cacheDealOfDay = await redis.get("dealOfDay");
        const dealOfDayTTL = await redis.ttl("dealOfDay");
        if (cacheDealOfDay) {
            return res.status(200).json({
                success: true,
                products: JSON.parse(cacheDealOfDay),
                timeLeft: dealOfDayTTL
            });
        }

        const randomProducts = await Products.aggregate([{ $sample: { size: 2 } }]);
        await redis.set("dealOfDay", JSON.stringify(randomProducts), 'EX', 86398);

        res.status(200).json({
            success: true,
            products: randomProducts,
            timeLeft: 86399
        });

    } catch (e) {
        console.log("Error retrieving deal of day products:", e);
        res.status(500).json(({
            success: false,
            message: "Internal Servel Error"
        }))
    }
}

export const featuredProducts = async (req, res) => {
    try {

        const cachedProducts = await redis.get("featuredProducts")
        if (cachedProducts) {
            return res.status(200).json({
                success: true,
                products: JSON.parse(cachedProducts)
            })
        }

        // Get 12 random products from the collection
        const randomProducts = await Products.aggregate([{ $sample: { size: 12 } }]);
        await redis.set("featuredProducts", JSON.stringify(randomProducts), 'EX', 1800)

        res.status(200).json({
            success: true,
            products: randomProducts
        });
    } catch (error) {
        console.log("Error retrieving random products: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getCategories = async (req, res) => {
    try {

        const cachedProducts = await redis.get("categories");
        if (cachedProducts) {
            return res.status(200).json({
                success: true,
                result: JSON.parse(cachedProducts)
            })
        }

        const categories = {
            "Clothes": ["shirt", "t-shirt", "tshirt", "top", "blouse", "tee", "shorts", "jeans", "pants", "trousers", "denim", "bottoms", "jacket", "sweaters", "coat", "hoodie", "blazer", "outerwear", "dress", "frock", "gown", "skirt", "maxi dress", "sweatshirt", "polo shirt", "tank top", "crop top", "cardigan", "sweatpants", "leggings", "jumpsuit", "romper", "overalls", "tunic", "pullover", "vest", "kimono", "bodysuit", "peplum top", "camisole", "tie-dye shirt", "wrap dress", "midi skirt", "flared jeans"],
            "Winters": ["winter jacket", "coat", "sweater", "scarf", "beanie", "gloves", "thermal wear", "snow boots", "winter boots", "snow pants", "puffer jacket", "fleece jacket", "down jacket", "parka", "trench coat", "cashmere sweater", "wool scarf", "earmuffs", "muffler", "snowboard jacket", "ski jacket", "faux fur coat", "chunky sweater", "knit scarf", "shearling coat", "quilted jacket", "polar fleece", "thick socks"],
            "Glasses": ["sunglasses", "eyeglasses", "reading glasses", "prescription glasses", "aviator glasses", "cateye glasses", "round glasses", "square glasses", "oversized sunglasses", "polarized sunglasses", "wayfarer sunglasses", "mirrored sunglasses", "retro glasses", "rimless glasses", "sports glasses", "gaming glasses", "computer glasses", "blue light glasses", "transition glasses", "progressive glasses", "bifocal glasses", "clip-on sunglasses"],
            "Shorts": ["shorts", "cargo shorts", "athletic shorts", "denim shorts", "running shorts", "chino shorts", "board shorts", "bermuda shorts", "swim shorts", "high-waisted shorts", "paperbag shorts", "linen shorts", "culotte shorts", "skort", "denim skirt", "skater skirt", "pleated skirt", "mini skirt", "midi skirt", "maxi skirt", "flowy skirt", "pencil skirt", "wrap skirt"],
            "Watch": ["watch", "wristwatch", "analog watch", "digital watch", "smartwatch", "sport watch", "casual watch", "dress watch", "luxury watch", "chronograph watch", "automatic watch", "mechanical watch", "quartz watch", "skeleton watch", "diver's watch", "field watch", "pilot watch", "fitness tracker", "GPS watch", "hybrid watch", "moonphase watch", "skeleton watch", "square watch"],
            "Hat": ["hat", "baseball cap", "beanie", "trucker hat", "bucket hat", "snapback", "fitted hat", "winter hat", "fedora hat", "sun hat", "straw hat", "fisherman hat", "beret", "newsboy cap", "visor hat", "visor cap", "boater hat", "panama hat", "cowboy hat", "top hat", "beanie with pom pom", "cable knit beanie", "slouchy beanie", "beret hat", "bucket hat with string"],
            "Perfume": ["perfume", "fragrance", "cologne", "eau de parfum", "eau de toilette", "perfume spray", "body mist", "perfume oil", "solid perfume", "roll-on perfume", "perfume set", "perfume gift set", "unisex perfume", "men's cologne", "women's perfume", "niche perfume", "designer perfume", "natural perfume", "floral perfume", "woody perfume", "citrus perfume", "oriental perfume", "spicy perfume", "musk perfume", "vanilla perfume", "sandalwood perfume", "amber perfume"],
            "Shoes": ["shoes", "sneakers", "running shoes", "athletic shoes", "boots", "casual shoes", "formal shoes", "sandals", "flip flops", "slippers", "loafers", "heels", "flats", "oxfords", "wedge sneakers", "chunky sneakers", "platform sneakers", "hiking shoes", "workout shoes", "basketball shoes", "soccer cleats", "tennis shoes", "golf shoes", "running sneakers", "walking shoes", "water shoes", "summer sandals", "slide sandals", "espadrille sandals", "strappy sandals", "comfort sandals"]
        };

        const result = {};

        for (const category in categories) {
            const productCount = await Products.countDocuments({ tags: { $in: categories[category] } });
            result[category] = productCount;
        }

        await redis.set("categories", JSON.stringify(result), 'EX', 1800);

        res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        console.log("Error in retrieving categories: ", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }

}

export const getProductById = async (req, res) => {
    try {

        const id = req.params.id;

        const cachedProducts = await redis.get(id);
        if (cachedProducts) {
            return res.status(200).json({
                success: true,
                product: JSON.parse(cachedProducts)
            })
        }

        const product = await Products.findById(id);

        if (product) {
            await redis.set(id, JSON.stringify(product), 'EX', 900)
            res.status(200).json({
                success: true,
                product
            })
        } else {
            res.status(200).json({
                success: false,
                error: "No Such Product exists"
            })
        }
    } catch (error) {
        console.log("Error in retrieving productById: ", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

export const getProductBySearch = async (req, res) => {
    try {
        let query = req.params.query;
        const page = parseInt(req.params.page) || 1; // Default to page 1 if not provided
        const limit = 12; // Adjust the limit as needed

        query = query.replace("%20", " ");

        // Split the query by spaces to get individual components
        const regexQuery = new RegExp(query.split(" ").join("|"), "i");

        const skip = (page - 1) * limit;

        // Find products with exact match in productName
        let exactMatchProducts = [];
        if (page === 1) exactMatchProducts = await Products.find({ productName: query });

        // Find products where any keyword matches productName, category, or tags
        const keywordMatchProducts = await Products.find({
            $or: [
                { productName: query },
                { productName: { $regex: regexQuery } },
                { category: { $regex: regexQuery } },
                { tags: { $regex: regexQuery } }
            ]
        })
            .skip(skip)
            .limit(limit);

        // Combine the results from both queries
        let combinedProducts = [...exactMatchProducts, ...keywordMatchProducts];

        // Filter out duplicate products
        combinedProducts = await Products.aggregate([
            { $match: { _id: { $in: combinedProducts.map(product => product._id) } } },
            { $group: { _id: "$_id", product: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$product" } }
        ]);

        if (combinedProducts.length > 0) {
            res.status(200).json({
                success: true,
                products: combinedProducts
            });
        } else {
            res.status(200).json({
                success: true,
                products: []
            });
        }
    } catch (error) {
        console.log("Error in retrieving productBySearch: ", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const addToWishlist = async (req, res) => {
    try {
        const { id } = req.body;
        const { user } = req;

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Update the user's wishlist array

        if (!user.wishlist.includes(id)) {
            user.wishlist.push(id);
            // Save the updated user document without validation
            await user.save({ validateBeforeSave: false });
        }

        res.status(200).json({
            success: true,
            message: 'Product added to wishlist successfully'
        });

    } catch (error) {
        console.log("Error in addToWishlist: ", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const likedProducts = async (req, res) => {
    try {
        const { user } = req;
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "User not authenticated"
            });
        }

        // Retrieve the user's wishlist
        const wishlist = user.wishlist;

        // Fetch the details of the liked products from the database using the wishlist
        const likedProductDetails = await Products.find({ _id: { $in: wishlist } });

        // Send the list of liked product details as a response
        res.status(200).json({
            success: true,
            likedProducts: likedProductDetails
        });
    } catch (error) {
        console.log("Error in getLikedProducts: ", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.body;
        const { user } = req;

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Update the user's wishlist array

        user.wishlist = user.wishlist.filter(itemId => itemId !== id)
        await user.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: 'Product added to wishlist successfully'
        });

    } catch (error) {
        console.log("Error in removeFromWishlist: ", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

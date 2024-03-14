import cloudinary from "cloudinary";

export const addProductImage = async (req, res, next) => {
    try {
        const { image } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "Product",
            width: 150,
        });
        let ans = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

        res.status(200).json({
            success: true,
            ans
        });
    } catch (error) {
        console.log("Error in addProductImage: " + error.message);
        return res.status(500).json({
            success:false,
            error: "Internal Server Error",
        })
    }
}


export const deleteProductImage = async (req, res, next) => {
    try {
        const { public_id } = req.body;
        // console.log(public_id)

        await cloudinary.v2.uploader.destroy(public_id);
        // console.log("success")
        res.status(200).json({
            success: true,
        });
        
    } catch (error) {
        console.log("Error in deleteProductImage: " + error.message);
        return res.status(500).json({
            success:false,
            error: "Internal Server Error",
        })
    }
}

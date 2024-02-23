import cloudinary from "cloudinary";

export const addSellerImage = async (req, res, next) => {
    try {
        const { image } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "Seller",
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
        console.log("Error in addSellerImage: " + error.message);
        return res.status(500).json({
            success:false,
            error: "Internal Server Error",
        })
    }
}


export const deleteSellerImage = async (req, res, next) => {
    try {
        const { public_id } = req.body;

        await cloudinary.v2.uploader.destroy(public_id);

        res.status(200).json({
            success: true,
        });
        
    } catch (error) {
        console.log("Error in deleteSellerImage: " + error.message);
        return res.status(500).json({
            success:false,
            error: "Internal Server Error",
        })
    }
}

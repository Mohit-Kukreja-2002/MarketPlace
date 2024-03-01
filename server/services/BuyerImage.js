import cloudinary from "cloudinary";

export const addBuyerImage = async (req, res) => {
    const { image } = req.body;

    try {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "Buyers",
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
        console.log("Error in addBuyerImage: " + error.message);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        })
    }
}


export const deleteBuyerImage = async (req, res) => {
    try {
        const { public_id } = req.body;

        await cloudinary.v2.uploader.destroy(public_id);

        res.status(200).json({
            success: true,
        });

    } catch (error) {
        console.log("Error in deleteBuyerImage: " + error.message);
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        })
    }
}

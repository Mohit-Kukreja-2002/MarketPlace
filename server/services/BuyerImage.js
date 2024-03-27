import cloudinary from "cloudinary";

export const addBuyerImage = async (image) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "Buyers",
            width: 150,
        });
        let ans = {
            success:true,
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        return ans;
    } catch (error) {
        console.log("Error in addBuyerImage: " + error);
        return {
            success: false,
            public_id: "",
            url: "",
        }
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

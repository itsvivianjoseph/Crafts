const router = require("express").Router();
const Url = require("../../models/Url");
const { generateShortUrl } = require("../../utils/generateUrl");

router.post("/", async (req, res) => {
    try {
        const { original_url } = req.body;

        const shortUrl = generateShortUrl(original_url) 
        
        const newUrl = new Url({
            original_url,
            short_url_key: shortUrl,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        
        const savedNewUrl = await newUrl.save();
        
        res.json(savedNewUrl);
    } catch (error) {
        console.log("Some error occurred...");
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
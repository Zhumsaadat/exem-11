import {Router} from "express";
import Products from "../models/Products";
import auth, {RequestWithUser} from "../middleware/auth";
import {imageUpload} from "../multer";

const productsRouter = Router();

productsRouter.post('/', auth, imageUpload.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const product = new Products({
            user: req.user?._id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? req.file.filename : null,
            category: req.body.category,
        });

        await product.save();

        return res.send(product);

    } catch (err) {
        return next(err);
    }
});

productsRouter.get('/', async (_req, res, next) => {
    try {
        const products = await Products.find().populate('user', ['displayName', 'phone']);

        return res.send(products);
    } catch (err) {
        return next(err);
    }
});

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
    try {
        const productId = req.params.id;
        const userId = req.user?._id;

        const product = await Products.findOne({_id: productId, user: userId});

        if (!product) {
            return res.status(403).send({error: `You don't have enough rights!`});
        }

        await Products.deleteOne({_id: productId});

        return res.send({message: 'Product deleted!'});
    } catch (err) {
        return next(err);
    }
});

export default productsRouter;
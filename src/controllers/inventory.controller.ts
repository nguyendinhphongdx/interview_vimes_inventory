import { Request, Response } from "express";
import { DetailDocumentModel, DetailWarehouseModel, DocumentModel, ProductModel, StockModel, UserModel, WareHouseReceiptModel } from "../models";

class InvertoryController {
    async index(req: Request, res: Response) {
        try {
            const userNormals = await UserModel.findAll({ where: { role: 'normal' } });
            const documents = await DocumentModel.findAll({ where: { status: 'pending' } });
            
            res.render('login', { users: userNormals, documents })
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async create(req: Request, res: Response) {
        try {
            const [users, documents, detail_documents, stocks, products, detail_receipts, receipts] = await Promise.all([
                UserModel.findAll(),
                DocumentModel.findAll(),
                DetailDocumentModel.findAll(),
                StockModel.findAll(),
                ProductModel.findAll(),
                DetailWarehouseModel.findAll(),
                WareHouseReceiptModel.findAll(),
            ]);

            res.render('inventory', { users, documents, detail_documents, stocks, products, detail_receipts, receipts });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async post(req: Request, res: Response) {
        try {
            const { accoutant_id, document_id, user_id, products } = req.body;
            if (!Number(accoutant_id) || !Number(document_id) || !Number(user_id) || products.length <= 0) throw new Error(`Invalid body`);
            const [Acccountant, Document, User] = await Promise.all([
                UserModel.findOne({ where: { user_id: accoutant_id } }),
                DocumentModel.findOne({ where: { document_id: document_id } }),
                UserModel.findOne({ where: { user_id: user_id } }),
            ]);

            if (!Acccountant) throw new Error(`Invalid Acccountant`);
            if (!Document) throw new Error(`Invalid Document`);
            if (!User) throw new Error(`Invalid User`);

            const receipt = await WareHouseReceiptModel.create({
                accoutant_id: Number(accoutant_id),
                document_id: Number(document_id),
                driver_id: Number(accoutant_id),
                user_id: Number(user_id),
            });

            const details = products.map((product: DetailWarehouseModel) => {
                return {
                    product_id: product.product_id,
                    quality: product.quality,
                    receipt_id: receipt.receipt_id ?? 1,
                };
            });
            const createdDetails = DetailWarehouseModel.bulkCreate(details);
            const updated = await DocumentModel.update({ status: 'completed' }, { where: { document_id: Document.document_id } });
            return res.json({ message: 'created', data: createdDetails });
        } catch (error: any) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }
}

export default new InvertoryController();
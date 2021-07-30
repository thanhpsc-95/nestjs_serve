import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id)
        } catch (error) {
            throw new NotFoundException("No product found");
        }
        if (!product) {
            throw new NotFoundException("No product found");
        }
        return product;
    }

    async insertProducts(title: string, description: string, price: number): Promise<string> {
        const newProduct = new this.productModel({ title, description, price });
        const saveResult = await newProduct.save();
        return saveResult.id as string;
    }

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map(product => ({ id: product.id, title: product.title, description: product.description, price: product.price }));
    }

    async getSingleProduct(id: string) {
        const product = await this.findProduct(id);
        return { id: product.id, title: product.title, description: product.description, price: product.price }
    }


    async updateProduct(id: string, title: string, description: string, price: number) {
        const updatedProduct = await this.findProduct(id);
        if (title) {
            updatedProduct.title = title
        }
        if (description) {
            updatedProduct.description = description
        }
        if (price) {
            updatedProduct.price = price
        }
        updatedProduct.save()
        return null
    }

    async deleteProduct(prodId: string) {
        const deleteResult = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (deleteResult.n === 0) {
            throw new NotImplementedException('Delete failed')
        } else {
            return null
        }
    }
}
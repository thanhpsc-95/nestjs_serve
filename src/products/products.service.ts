import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/products.inteface';
import { ProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('No product found');
    }
    if (!product) {
      throw new NotFoundException('No product found');
    }
    return product;
  }

  async insertProducts(product: ProductDto): Promise<string> {
    const newProduct = new this.productModel(product);
    const saveResult = await newProduct.save();
    return saveResult.id as string;
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => product);
  }

  async getSingleProduct(id: string) {
    const product = await this.findProduct(id);
    return product;
  }

  async updateProduct(product: ProductDto) {
    const updatedProduct = await this.findProduct(product.id);
    if (product.title) {
      updatedProduct.title = product.title;
    }
    if (product.description) {
      updatedProduct.description = product.description;
    }
    if (product.price) {
      updatedProduct.price = product.price;
    }
    updatedProduct.save();
    return null;
  }

  async deleteProduct(prodId: string) {
    const deleteResult = await this.productModel
      .deleteOne({ _id: prodId })
      .exec();
    if (deleteResult.n === 0) {
      throw new NotImplementedException('Delete failed');
    } else {
      return null;
    }
  }
}

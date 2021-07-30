import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export default class ProductsController {

    constructor(private readonly productsService: ProductsService) { }
    @Post()
    async addProducts(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = await this.productsService.insertProducts(prodTitle, prodDescription, prodPrice)
        return { id: generatedId };
    }
    @Get()
    async getAllProducts() {
        return await this.productsService.getAllProducts();
    }

    @Get(':id')
    async getSingleProduct(@Param('id') prodId: string) {
        return await this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number) {
        return await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice)
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        return await this.productsService.deleteProduct(prodId)
    }

}

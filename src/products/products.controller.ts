import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/products.dto';

@Controller('products')
export default class ProductsController {

    constructor(private readonly productsService: ProductsService) { }
    @Post()
    async addProducts(
        @Body() addProduct: ProductDto,
    ) {
        const generatedId = await this.productsService.insertProducts(addProduct)
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
        @Param('id') prodId: string, @Body() updateProduct: ProductDto) {
        return await this.productsService.updateProduct({ ...updateProduct, id: prodId })
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        return await this.productsService.deleteProduct(prodId)
    }

}

import { FavoriteProductService } from "../services/favoriteProduct.service";

export default class FavoriteProductHelper {
    static addOrDelte(product: any, service: FavoriteProductService, productType: string) {
        const formData = new FormData();
        formData.append('id', '0');
        formData.append('productId', product.id.toString());
        formData.append('productType', productType);
        if (!product.isHaveStar) {
            service.addFavoriteProduct(formData).subscribe(x => {
                console.log(x)
                if (x.success)
                    product.isHaveStar = true;
            })
        } else {
            service.delete(formData).subscribe(x => {
                if (x.success)
                    product.isHaveStar = false;
            })
        }

    }
}
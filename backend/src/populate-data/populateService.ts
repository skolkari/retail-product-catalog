import { populateProducts, Product } from "./populate-products";

const validateProduct = (product: Product): boolean => {
    const requiredFields = ['name', 'category', 'description', 'price', 'imageUrl'];
    for (const field of requiredFields) {
        if (!product[field as keyof Product]) {
            console.error(`Validation failed: Missing field ${field} in product ${JSON.stringify(product)}`);
            return false;
        }
    }
    return true;
};

export const checkAndPopulateDataOnStart = async () => {
    console.log('Checking and populating data...');

    const response = await fetch('http://localhost:3000/api/products');
    if (response.ok) {
        const data = await response.json();
        if (data.products.length === 0) {
            console.log('No products found. Populating data...');
            await populateData();
        } else {
            console.log('Data already present. Skipping population.');
        }
    } else {
        console.error('Failed to fetch products', await response.text());
    }
}

export const populateData = async () => {
    console.log('Populating data...');

    let successCount = 0;
    let failureCount = 0;

    for (const product of populateProducts) {
        if (!validateProduct(product)) {
            failureCount++;
            continue;
        }

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`Added product: ${data.name}`);
                successCount++;
            } else {
                console.error(`Failed to add product: ${product.name}`, await response.text());
                failureCount++;
            }
        } catch (error) {
            console.error(`Error adding product: ${product.name}`, error);
            failureCount++;
        }
    }

    console.log(`Finished adding products. Success: ${successCount}, Failures: ${failureCount}`);
};
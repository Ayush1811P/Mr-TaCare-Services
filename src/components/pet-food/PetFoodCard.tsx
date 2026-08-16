import Image from 'next/image';
import type { PetFoodProduct } from '@/types/pet-food';

export function PetFoodCard({ product }: { product: PetFoodProduct }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl">
      <div className="relative aspect-square w-full bg-white p-4">
        <Image
          src={product.imageUrl || '/images/pet-food.jpg'}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-bold text-gray-900">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            )}
          </div>
          <span className="text-sm font-medium text-gray-500">{product.retailer}</span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-2xl font-bold text-teal-900">
            {product.price ? `₹${product.price}` : 'Check price'}
          </p>
        </div>
        <a
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-teal-800 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-teal-900"
        >
          BUY NOW
        </a>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Button, Link } from "@components/ui";
import { Counter } from "@components/common";
import usePrice from "@framework/product/use-price";
import { useProductQuery } from "@framework/product/get-product";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { useWindowSize } from "@utils/index";


const ProductSingleDetails: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();
  const { width } = useWindowSize();
  const { data, isLoading } = useProductQuery(slug as string);
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.sale_price ? data.sale_price : data.price,
      baseAmount: data.price,
      currencyCode: "USD",
    }
  );
  if (isLoading) return <p>Loading...</p>;

  function addToCart() {
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 600);

    const item = generateCartItem(data!, []);
    addItemToCart(item, quantity);
    toast("Added to the bag", {
      type: "default",
      progressClassName: "fancy-progress-bar",
      position: width > 768 ? "bottom-right" : "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.log(item, "item");
  }

  return (
    <div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
      {width < 1025 ? (
        <div className="product-gallery">
          {data?.gallery?.map((item, index: number) => (
              <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                <img
                  src={
                    item?.original ??
                    "/assets/placeholder/products/product-gallery.svg"
                  }
                  alt={`${data?.name}--${index}`}
                  className="object-cover w-full"
                />
              </div>
          ))}
        </div>
      ) : (
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {data?.gallery?.map((item, index: number) => (
            <div
              key={index}
              className="col-span-1 transition duration-150 ease-in hover:opacity-90"
            >
              <img
                src={
                  item?.original ??
                  "/assets/placeholder/products/product-gallery.svg"
                }
                alt={`${data?.name}--${index}`}
                className="object-cover w-full"
              />
            </div>
          ))}
        </div>
      )}

      <div className="col-span-4 pt-8 lg:pt-0">
        <div className="pb-7 mb-7 border-b border-gray-300">
          <h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
            {data?.name}
          </h2>
          <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
            {data?.description}
          </p>
          <div className="flex items-center mt-5">
            <div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
              {price}
            </div>
            {discount && (
              <span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
                {basePrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8">
          <Counter
            quantity={quantity}
            onIncrement={() => setQuantity((prev) => prev + 1)}
            onDecrement={() =>
              setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
            }
            disableDecrement={quantity === 1}
          />
          <Button
            onClick={addToCart}
            variant="slim"
            className="w-full md:w-6/12 xl:w-full bg-gray-400 hover:bg-gray-400"
            loading={addToCartLoader}
          >
            <span className="py-2 3xl:px-8">Add to cart</span>
          </Button>
        </div>
        <div className="py-6">
          <ul className="text-sm space-y-5 pb-1">
            <li>
              <span className="font-semibold text-heading inline-block pe-2">
                SKU:
              </span>
              <span>{data?.sku}</span>
            </li>
            <li>
              <span className="font-semibold text-heading inline-block pe-2">
                Category:
              </span>
              <Link
                href="/"
                className="transition hover:underline hover:text-heading"
              >
                {data?.category?.name}
              </Link>
            </li>
            {/* {data?.tags && Array.isArray(data.tags) && (
              <li className="productTags">
                <span className="font-semibold text-heading inline-block pe-2">
                  Tags:
                </span>
                {data.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={tag.slug}
                    className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"
                  >
                    {tag.name}
                    <span className="text-heading">,</span>
                  </Link>
                ))}
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductSingleDetails;

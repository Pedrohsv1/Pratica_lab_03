import { useEffect, useState } from "react";
import api from "../services/api";

interface IProdutos {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

/*
brand: "Apple"
category: "smartphones"
description: "An apple mobile which is nothing like apple"
discountPercentage: 12.96
id: 1
images: Array(5)
0: "https://i.dummyjson.com/data/products/1/1.jpg"
1: "https://i.dummyjson.com/data/products/1/2.jpg"
2: "https://i.dummyjson.com/data/products/1/3.jpg"
3: "https://i.dummyjson.com/data/products/1/4.jpg"
4: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
length: 5[[Prototype]]: Array(0)
price: 549
rating: 4.69
stock: 94
thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
title: "iPhone 9"
*/

function Produtos() {
  const [produtos, setProdutos] = useState<IProdutos[]>([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      await api
        .get("/products?limit=10")
        .then((response: any) => response.data.products)
        .then((prod: IProdutos[]) => setProdutos(prod));
    };

    void carregarProdutos();
  }, []);

  return (
    <div style={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <p>Produtos</p>
      {produtos.map((prod: IProdutos) => {
        return (
          <div key={prod.id}>
            <h2>{prod.title}</h2>
            <div
              style={{
                margin: "auto",
                height: "50vh",
                width: "50vw",
                backgroundColor: "white",
              }}
            >
              <img
                src={prod.images[0]}
                alt=""
                style={{
                  height: "50vh",
                  width: "50vw",
                  objectFit: "contain",
                }}
              />
            </div>
            <div>
              <p>{prod.price},00</p>
              <div>
                <p>{Math.trunc(prod.discountPercentage)}% Sale</p>
                <p>
                  {Math.trunc(
                    prod.price - prod.price * (prod.discountPercentage / 100)
                  )}
                  ,00
                </p>
              </div>
            </div>

            <p>{prod.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Produtos;

import { useEffect, useState } from "react";
import api from "../services/api";
import './produtos.css'

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
  const [filteredList, setFilteredList] = useState<IProdutos[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>('')


  const filter = [
    'smartphones',
    'laptops'
  ]

  useEffect(() => {
    const carregarProdutos = async () => {
      const response = await api.get("/products?limit=10");
      const prod: IProdutos[] = response.data.products;
      setProdutos(prod);
      setFilteredList(prod);
    };

    void carregarProdutos();
  }, []);

  const setFilter = (filtro: string) => {
    if (selectedFilter === filtro) {
      setSelectedFilter('');
      setFilteredList(produtos);
    } else {
      setSelectedFilter(filtro);
      setFilteredList(produtos.filter(prod => prod.category === filtro));
    }
  };
  
  return (
    <div className="wrapper">
      <h1 style={{padding: '2em'}}>Produtos</h1>
      <div className="filter">
        {filter.map((filtro: string, index) => (
          <button className="filterUnic" key={index} style={{backgroundColor: filtro === selectedFilter ? 'rgba(255, 255, 255, 0.08)' : '#121212'}} onClick={() => {setFilter(filtro)}}>
            <p>{filtro}</p>
          </button>
        ))
        }
        
      </div>
      <div style={{flexWrap: 'wrap', display: "flex", alignItems: 'center', justifyContent: 'center', gap: '2em', padding: '2em'}}>
        {filteredList.map((prod: IProdutos) => {
          return (
            <div key={prod.id} className="card" style={{ width: "200px", display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', borderRadius: '4px', overflow:'hidden'  }}>

              <div
                style={{
                  height: "100px",
                  width: "200px",
                  backgroundColor: "#fff",
                  position: 'relative',

                }}
              >
                <img
                  src={prod.thumbnail}
                  alt=""
                  style={{
                    height: "100px",
                    width: "200px",
                    objectFit: "contain",
                  }}
                />
                <div style={{width: '80px', position: 'absolute', translate: '-50% 0%', bottom: 10, left:'50%', backgroundColor: "#121212", padding: '0.25em 0.5em', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px',display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
                  <p>{prod.price},00</p>
                </div>
              </div>
              <div style={{flexDirection: 'column', display: "flex", height: '10em', padding: '1em', alignItems: 'center', gap: '1em', marginTop: '1em' }}>
              <p><strong>{prod.title}</strong></p>   
              <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>{prod.category}</p>
                  
                  {/* <p>{Math.trunc(prod.discountPercentage)}% Sale</p>
                  <p>
                    {Math.trunc(
                      prod.price - prod.price * (prod.discountPercentage / 100)
                    )}
                    ,00
                  </p>*/}

              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default Produtos;

import { useEffect, useState } from "react";
import Product from "../Product/Product";
import './Shop.css'
import Card from "../Card/Card";
import { addToDb, getStoredCart } from "../../Utilities/fakeData";


const Shop = () => {
    const [card,setCard] =useState ([]);
    const [products,setProduct] = useState([]);


    useEffect(()=>{
        fetch('product.json')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])


    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCard(savedCart)

    },[products])



    const handelAddToCart =(selectedProduct)=>{
      console.log(selectedProduct);
      let newCard = [];

      const exist = card.find(product => product.id === selectedProduct.id)
      
      if(!exist){
        selectedProduct.quantity = 1;
        newCard = [...card,selectedProduct]
        setCard(newCard)
       }else{
       
        const rest = card.filter(product => product.id !== selectedProduct.id)
        exist.quantity = exist.quantity + 1;
        newCard =[...rest,exist]

       }
      setCard(newCard)
      addToDb(selectedProduct.id)
     }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                      handelAddToCart={handelAddToCart}
                      >
                      </Product>)
                }
            </div>
             <div className="card-container">
                <Card
                card={card}
                ></Card>
             </div>
            
        </div>
    );
};

export default Shop;
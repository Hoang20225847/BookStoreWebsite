function DiscountPrice(a,b) {
    const d=parseFloat(a)
    const c=b*d/100;
    return ( 
        Math.ceil(d-c)
       );
}

export default DiscountPrice 

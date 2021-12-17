import React, { useState, useCallback } from "react";
import CartItem from "../CartItem/CartItem";
import {
  Wrapper,
  CashPayBtn,
  FlexBox,
  GetDctBtn,
  CashPayBtnSmall,
  CardPayBtnSmall,
  CardCouponPayBox,
  PayForCardBtn,
} from "./Cart.styles";
import { CartItemType } from "../App";
import { Radio } from "antd";
import {coupons} from '../coupons';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const [discountPrice, setDiscountPrice] = useState<any>(0);
  const [defaultChecked, setDefaultChecked] = useState<any>("unApplied");
  const [openCashPayment, setOpenCashPayment] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openAddDiscountBox, setOpenAddDiscountBox] = useState<boolean>(false);


    // let totalCount = 0;
    // if (cartItems) {
    //   cartItems.map((p: any) => {
    //     totalCount += p.price;
    //   });
    // }

  console.log(defaultChecked, "defaultChecked");

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  let totalCount = calculateTotal(cartItems);

  let takeoutPrice = 0;
  let takeoutPrice7 = 0;
  let takeoutPrice10 = 0;
  if (cartItems) {
    cartItems.map((item) => {
      if (item.title === "아메리카노 (Take out) 500원") {
        takeoutPrice = item.price * 0.05 * item.amount;
        takeoutPrice7 = item.price * 0.07 * item.amount;
        takeoutPrice10 = item.price * 0.1 * item.amount;
        // cartItems.length;
      }
    });
  }

    const payCard = () => {
      setOpen(!open);
      setOpenCashPayment(false);
    };

    const payCash = () => {
      setOpenCashPayment(!openCashPayment);
      setOpen(false);
    };


  const handleChange = useCallback(
    (event : any) => {
      setDefaultChecked(event.target.value);
      if (event.target.value === "5% 할인") {
         setDiscountPrice(totalCount * 0.95 + takeoutPrice);
        // Math.floor(setDiscountPrice(totalCount * 0.95 + takeoutPrice) / 100);
      }
      if (event.target.value === "7% 할인") {
        setDiscountPrice(totalCount * 0.93 + takeoutPrice7);
        // Math.floor(setDiscountPrice(totalCount * 0.93 + takeoutPrice7) / 100);
      }
      if (event.target.value === "10% 할인") {
         setDiscountPrice(totalCount * 0.9 + takeoutPrice10);
        // Math.floor(setDiscountPrice(totalCount * 0.9 + takeoutPrice10) / 100);
      }
      if (event.target.value === "unApplied") {
        setDiscountPrice(totalCount);
        // Math.floor(setDiscountPrice(totalCount) / 100);
      }
    },
    [setDiscountPrice, totalCount]
  );

    const handleChangeCashPayment = useCallback(
      (event) => {
        setDefaultChecked(event.target.value);

        if (event.target.value === coupons[0].title) {
          setDiscountPrice(totalCount * 0.95 + takeoutPrice);
        }
        if (event.target.value === coupons[1].title) {
             setDiscountPrice(totalCount * 0.93 + takeoutPrice7);
          // Math.floor(setDiscountPrice(totalCount * 0.93 + takeoutPrice7) / 100);
        }
        if (event.target.value === coupons[2].title) {
          setDiscountPrice(totalCount * 0.9 + takeoutPrice10);
        }
        if (event.target.value === "unApplied") {
          setDiscountPrice(totalCount);
        }
      },
      [setDiscountPrice, totalCount]
    );

     const addDiscountHandler = () => {
      //  setOpenAddDiscountBox(!openAddDiscountBox);
      //  setOpen(false);
       setOpenCashPayment(false);
       setOpenAddDiscountBox(true)
     };


  const cardPayment = () => {
    alert("카드결제 완료");
    window.location.replace("/");
  };

  const cashPayment = () => {
    alert("현금결제 완료");
    window.location.replace("/");
  };

  let totalDiscountPrice = 0;
  if (defaultChecked === "unApplied") {
    totalDiscountPrice = 0;
  } else {
    totalDiscountPrice = Math.floor(totalCount - discountPrice);
  }
  const add5discount = totalCount * 0.05;

    let takeOutNoticeWord:any = "";
    if (cartItems) {
      cartItems.map((price) => {
        if (price.title === "아메리카노 (Take out) 500원") {
          takeOutNoticeWord = (
            <p>
              아메리카노 take out 구매시 쿠폰 사용 불가합니다. 단, 현금 결제시
              5% 할인 가능합니다.
            </p>
          );
        }
      });
    }

  
  return (
    <Wrapper>
      <h2>주문 내역</h2>
      {cartItems.length === 0 ? <p>주문 내역이 없습니다.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>{`결제:${calculateTotal(cartItems)}`}</h2>
      <h3>{takeOutNoticeWord}</h3>

      <div className="paymentBox">
        <CashPayBtnSmall onClick={payCash}>현금결제</CashPayBtnSmall>
        <CardPayBtnSmall onClick={payCard}>카드결제</CardPayBtnSmall>

        {open && (
          <CardCouponPayBox>
            <Radio.Group
              value={defaultChecked}
              buttonStyle="solid"
              style={{ margin: "25px 50px 0 60px" }}
              onChange={handleChange}
            >
              <Radio value={"unApplied"}>쿠폰 미적용</Radio>
              <Radio value={"5% 할인"}>5% 할인 쿠폰</Radio>
              <Radio value={"7% 할인"}>7% 할인 쿠폰</Radio>
              <Radio value={"10% 할인"}>10% 할인 쿠폰</Radio>
              <p>{`할인된 가격 : ${discountPrice}`}</p>
            </Radio.Group>
            <PayForCardBtn onClick={cardPayment}>카드 결제하기</PayForCardBtn>
          </CardCouponPayBox>
        )}

        {openCashPayment && (
          <div>
            <Radio.Group
              value={defaultChecked}
              buttonStyle="solid"
              style={{ margin: "25px 50px 0 60px" }}
              onChange={handleChangeCashPayment}
            >
              <Radio value={"unApplied"}>쿠폰 미적용</Radio>
              <Radio value={"5% 할인"}>5% 할인 쿠폰</Radio>
              <Radio value={"7% 할인"}>7% 할인 쿠폰</Radio>
              <Radio value={"10% 할인"}>10% 할인 쿠폰</Radio>
              <FlexBox>
                {defaultChecked === "unApplied" ? (
                  <h3>{`결제 금액: ${calculateTotal(cartItems)} 원`}</h3>
                ) : (
                  <h3>{`결제 금액 : ${discountPrice} 원`}</h3>
                )}

                <GetDctBtn onClick={addDiscountHandler}>
                  <p>추가 5% 할인 받기</p>
                </GetDctBtn>
              </FlexBox>
            </Radio.Group>
          </div>
        )}
        <div>
          {openAddDiscountBox && (
            <div>
              <p> 쿠폰 할인적용 :{totalDiscountPrice}원 </p>
              <p> 추가 5% 할인적용 : {add5discount}원 </p>
              <h2>
                최종 결제금액 :
                {totalCount - (totalDiscountPrice + add5discount)}원
              </h2>
            </div>
          )}
        </div>
        <CashPayBtn onClick={cashPayment}>
          <span>현금 결제하기 </span>
        </CashPayBtn>
      </div>
    </Wrapper>
  );
};

export default Cart;
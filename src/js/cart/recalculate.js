const recalculateConfig = {
  wrapperSelector:  '.recalculate',
  btnRemoveSelector:  '.recalculate__btn_remove',
  btnAddSelector:  '.recalculate__btn_add',
  btnHandlerSelector:  '.recalculate__handler',
  fieldSelector:  '.recalculate__field',
  counterSelector:  '.recalculate__value',
  priceSelector:  '.recalculate__price',
  remainsSelector:  '.recalculate__remains'
};
const cartConfig = {
  minSummEl: document.querySelector('.cart__minsumm'),
  orderEnabledEl: document.querySelector('.cart__checkout_order_enabled'),
  orderDisabledEl: document.querySelector('.cart__checkout_order_disabled'),
  orderDiffEl: document.querySelector('.cart__order-diff'),
  disabledClassName: 'd-none'
};

const { minSummEl } = cartConfig;
const minSummValue = Number(minSummEl.textContent);

const { wrapperSelector } = recalculateConfig;
const recalcWrapperArr = Array.from(document.querySelectorAll(wrapperSelector));

function recalc(
  value,
  counter,
  field,
  handler,
  btn
) {
  field.value = value;
  counter.textContent = value;
  btn.disabled = false;
  handler.dispatchEvent(new MouseEvent('click'));
}

function disableBtn(cond, target) {
  if(cond) {
    target.disabled = true;
  } else {
    target.disabled = false;
  }
}

function getSumm(currentSumm, elem) {
  const { fieldSelector, priceSelector } = recalculateConfig;
  const recalcWrapperArr = Array.from(document.querySelectorAll(wrapperSelector));
  const currentArr = [];
  for(let i = 0; i < recalcWrapperArr.length; i++) {
    if(recalcWrapperArr[i] != elem) {
      currentArr.push(recalcWrapperArr[i])
    }
  }
  const summArr = currentArr.map(item => {
    const inputValue = Number(item.querySelector(fieldSelector).value);
    const priceValue = Number(item.querySelector(priceSelector).textContent);
    return inputValue*priceValue;
  });
  return summArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0) + currentSumm;
}

function checkSumm(totalSumm) {
  const { orderEnabledEl, orderDisabledEl, orderDiffEl, disabledClassName } = cartConfig;
  orderDiffEl.textContent = minSummValue - totalSumm;
  if(totalSumm >= minSummValue) {
    orderDisabledEl.classList.add(disabledClassName);
    orderEnabledEl.classList.remove(disabledClassName);
  } else {
    orderDisabledEl.classList.remove(disabledClassName);
    orderEnabledEl.classList.add(disabledClassName);
  }
}

function handleCartOptions(
  value,
  counter,
  field,
  handler,
  btn,
  cond,
  target,
  currentSumm,
  elem
) {
  const totalSumm = getSumm(currentSumm, elem);
  recalc(value, counter, field, handler,btn);
  disableBtn(cond, target);
  checkSumm(totalSumm);
  console.log(totalSumm);
}

recalcWrapperArr.forEach(recalcWrapperArrEl => {
  const {
    btnRemoveSelector,
    btnAddSelector,
    btnHandlerSelector,
    fieldSelector,
    counterSelector,
    priceSelector,
    remainsSelector
  } = recalculateConfig;
  const btnRemove = recalcWrapperArrEl.querySelector(btnRemoveSelector);
  const btnAdd = recalcWrapperArrEl.querySelector(btnAddSelector);
  const btnHandler = recalcWrapperArrEl.querySelector(btnHandlerSelector)
  const fieldEl = recalcWrapperArrEl.querySelector(fieldSelector);
  const counterEl = recalcWrapperArrEl.querySelector(counterSelector);
  const priceEl = recalcWrapperArrEl.querySelector(priceSelector);
  const remainsEl = recalcWrapperArrEl.querySelector(remainsSelector);

  btnRemove.addEventListener('click', (e) => {
    let currentValue = Number(fieldEl.value) - 1;
		currentValue = currentValue < 1 ? 1 : currentValue;
    handleCartOptions(
      currentValue,
      counterEl,
      fieldEl,
      btnHandler,
      btnAdd,
      currentValue === 1,
      e.target,
      currentValue*Number(priceEl.textContent),
      recalcWrapperArrEl
    )
  });

  btnAdd.addEventListener('click', (e) => {
    const currentValue = Number(fieldEl.value) + 1;
    const remainsValue = Number(remainsEl.textContent);
    handleCartOptions(
      currentValue,
      counterEl,
      fieldEl,
      btnHandler,
      btnRemove,
      currentValue >= remainsValue,
      e.target,
      currentValue*Number(priceEl.textContent),
      recalcWrapperArrEl
    )
  });
});

miniShop2.Callbacks.add('Cart.remove.response.success', 'cart_remove_ok', (response) => {
  checkSumm(response.data.total_cost);
});

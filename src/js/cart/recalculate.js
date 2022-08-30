document.querySelectorAll('.recalculate__btn_remove').forEach(recalcRemove => {
	recalcRemove.addEventListener('click', (e) => {
		let input = e.target.closest('.recalculate').querySelector('.recalculate__field');
		let count = parseInt(input.value) - 1;
		count = count < 1 ? 1 : count;
		e.target.closest('.recalculate').querySelector('.recalculate__value').textContent = count;
		input.value = count;
		e.target.closest('form').querySelector('[value="cart/change"]').click();
		return false;
	});
});
document.querySelectorAll('.recalculate__btn_add').forEach(recalcAdd => {
	recalcAdd.addEventListener('click', (e) => {
		let input = e.target.closest('.recalculate').querySelector('.recalculate__field');
		e.target.closest('.recalculate').querySelector('.recalculate__value').textContent = parseInt(input.value) + 1;
		input.value = parseInt(input.value) + 1;
		e.target.closest('form').querySelector('[value="cart/change"]').click();
		return false;
	});
});
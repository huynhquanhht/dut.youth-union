const money = {
  formatVND: (money) => {
    return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  }
};

export default money;
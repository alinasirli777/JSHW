let balance = 1000;
const correctPIN = 7777;
let totalWithdrawn = 0;
let totalDeposited = 0;
let attemptCount = 0;
const usdRate = 1.70;
const eurRate = 1.90;
while (true) {
    if (attemptCount >= 3){
        alert('Карта заблокирована');
        break;
    }
    else {
    let inputPIN = Number(prompt('Введите ПИН - код: '));
    if (inputPIN != correctPIN){
        attemptCount++;
    }
    else {
        break;
    }
    }
}

if (attemptCount < 3) {
    let operationsCount = 0;
    while (true) {
        let inputChoice = Number(prompt(`1 - баланс\n2 - снять\n3 - пополнить\n4 - баланс в USD и EUR\n0 - выход`));
        
        if (inputChoice === 0) {
            alert (`Статистика:\nСнято: ${totalWithdrawn}\nПополнено: ${totalDeposited}\nВсего операций: ${operationsCount}`)
            break;
        } 

        switch (inputChoice) {
            case 1:
                alert(`Баланс: ${balance} AZN`);
                operationsCount++;
                break;
            case 2:
                if (totalWithdrawn >= 2000) {
                    alert('Превышен дневной лимит в 2000 AZN');
                    break;
                }

                let withdrawAmount = 0;
                let comission = 0;
                while (true) {
                    withdrawAmount = Number(prompt('Введите сумму для снятия со счёта: '));
                    comission = withdrawAmount > 500 
                    ? withdrawAmount * 0.01 
                    : 0;
                if ((totalWithdrawn + withdrawAmount) > 2000) {
                    alert ('Сумма превышает остаток дневного лимита');
                    continue;
                }
                else if ((withdrawAmount + comission) > balance){
                    alert('Недостаточно средств');
                    continue;
                }
                else if (withdrawAmount <= 0 || withdrawAmount % 5 != 0) {
                    alert('Сумма должна быть больше нуля и кратна 5');
                    continue;
                }
                break;
                };
                totalWithdrawn += withdrawAmount;
                balance -= (withdrawAmount + comission);
                operationsCount++;
                break;
            case 3:
                let depositAmount = 0;
                while (true) {
                    depositAmount = Number(prompt('Введите сумму для пополнения счёта: '));
                    if (depositAmount <= 0 || depositAmount % 5 != 0) {
                        alert('Сумма должна быть больше нуля и кратна 5');
                        continue;
                    }
                    totalDeposited += depositAmount;
                    balance += depositAmount;
                    operationsCount++;
                    break;
                }
                break;
            case 4:
                alert(`Баланс в USD: ${(balance/usdRate).toFixed(2)} USD\nБаланс в EUR: ${(balance/eurRate).toFixed(2)} EUR`)
                    operationsCount++;
                break;
            default:
                alert('Неверный пункт меню')
                break;
        }
    }
}
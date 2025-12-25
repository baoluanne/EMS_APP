export enum HinhThucThuType {
	Cash,
	BankTransfer,
}

export const HinhThucThuOptions = [
	{ value: HinhThucThuType.Cash, label: 'Tiền mặt' },
	{ value: HinhThucThuType.BankTransfer, label: 'Chuyển khoản' },
];

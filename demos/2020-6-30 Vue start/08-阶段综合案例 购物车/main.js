/**
 * 7-12 创建
 */
const vm = new Vue({
	el: '#el1',
	data: {
		list: [
			{
				id: 1,
				name: '《算法导论》',
				date: '2006-9',
				price: 85.00,
				count: 1
			},
			{
				id: 2,
				name: '《UNIX编程艺术》',
				date: '2006-2',
				price: 59.00,
				count: 1
			},
			{
				id: 3,
				name: '《编程珠玑》',
				date: '2008-10',
				price: 39.00,
				count: 1
			},
			{
				id: 4,
				name: '《代码大全》',
				date: '2006-3',
				price: 128.00,
				count: 1
			},
		]
	},
	methods: {
		increase(index) {
			this.list[index].count++
		},
		decrease(index) {
			this.list[index].count--
		},
		remove(index){
			this.list.splice(index,1)
		}
	},
	computed: {
		totalPrice() {
			let totalPrice = 0;
			// for (let i = 0;i < this.list.length;i++) {
			// 	totalPrice += this.list[i].price * this.list[i].count
			// }
			// for (let i in this.list) {
			// 	totalPrice += this.list[i].price * this.list[i].count
			// }
			// for (let item of this.list) {
			// 	totalPrice += item.price * item.count
			// }
			// return totalPrice;
			
			// return this.list.reduce(function(pre,item){
			// 	return pre + item.price * item.count
			// },0)
			// 箭头函数写法,真滴666
			return this.list.reduce((pre,item) => pre + item.price * item.count , 0)
		}
	},
	// 过滤器
	filters: {
		showPrice(price) {
			return '￥' + price.toFixed(2);
		}
	}
})

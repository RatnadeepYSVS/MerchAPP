import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from 'moment'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const genOrder= (data,orders)=>{
    const billItems = orders.filter(({ billId })=>data.billId === billId)
    const total = billItems.reduce((acc,val)=>val.cost*val.quantity+acc,0)
    const quantity = billItems.reduce((acc,val)=>val.quantity+acc,0)
    const prods = billItems.map(prod=>[prod.productname,`${prod.quantity}`,`${prod.cost}₹`])
    prods.unshift(['Name','Quantity',"Cost"])
    const { name,billId,orderDate,email,phone,house,lane,city,state,pincode } = billItems[0]
    const parsedDate = moment.utc(orderDate);
    const time = parsedDate.format('hh:mm:ss A');
    const day = parsedDate.format('YYYY-MM-DD');
    const orderString = `${day} ${time}`
    const addressString = `${house},${lane},${city},${state},${pincode}`
    console.log(addressString)
    let billData = {
		info: {
			title: `${name}-${billId}`,
			author: 'Merch.Co',
		},
		watermark: {
			text: 'Merch.Co!',
			color: 'gray',
			opacity: 0.1,
			bold: true,
			italics: false,
		},
		content: [
			{
				text: `OrderId:- ${billId}`,
				style: 'header',
				margin: [5, 2, 10, 20],
			},
            {
                text:`Username:- ${name}`,
                style: 'header',
				margin: [5, 2, 10, 20],
            },
            {
                text:`You Ordered ${quantity} Items`,
                style:"subheader",
                margin:[5,2,10,20]
            },
			{
				text: `Ordered On:- ${orderString}`,
				style: 'subheader',
				margin: [5, 2, 10, 20],
			},
            {
				layout: 'lightHorizontalLines',
				table: {
					headerRows: 1,
					widths: ['*', '*','*'],
					body: prods.map(product => product),
					margin: [5,10, 20],
				},
			},
			{
				text: `(Stripe Payment Gateway INR) Amount Recieved: ${total}₹`,
				style: 'header',
				margin: [5, 2, 10, 20],
			},
            {
                text:`Delivering Order to:-\n ${addressString} \n\n User's Email:-${email} \n\n User's Contact Number:- +91${phone}`,
                style:"subheader",
                margin:[5,2,10,20]
            },
			{
				text:'Thank you for ordering.We hope to continue Shopping With You.',
				style: 'boldText',
				margin: [5, 2, 10, 20],
			},
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
			},
			subheader: {
				fontSize: 12,
				bold: true,
			},
			boldText: {
				bold: true,
			},
		},
	};
    try {
        pdfMake.createPdf(billData).download(`Bill:-${name}-${billId}`)
    } catch (error) {
        console.log(error)
    }
}
export default genOrder
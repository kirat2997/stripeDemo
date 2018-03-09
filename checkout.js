const stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2')

module.exports = async (data) => {
  const amount = data.amount
  const info = {
    card: {
      number: data.cardNumber,
      cvc: data.cvc,
      exp_month: data.mm,
      exp_year: data.yy
    }
  }
  
  try{
    const result = await stripe.tokens.create(info)
    const paid = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      description: "Example charge",
      source: result.id
    })
    return {status:'success', message:`Payment Successful Amount Paid : $${amount}.`}
  }catch(e){
    return {status:'fail', error:e}
  }

  return result.id
}
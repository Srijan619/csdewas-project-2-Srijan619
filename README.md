
#### Project Description
The   visualization of  the  performance  of  stock  portfolios.  The working name of the software to be developed is SPMS, short for Stock Portfolio Management System. In  the  program,  a user  can manage several  portfolios.  A portfolio is  a  collection  of stocks. A stock is a collection of shares of a given corporation(identified by a symbol of 3 or 4 letters –for instance, NOK for Nokia, or MSFT for Microsoft). A share is an atomic unit of ownership of a company characterized by a symbol and a value.

#### Assumptions

There is only one user for the current application. No authentication is required.

#### Functionalities of SPMS

1. User can create a portfolio
 * The user can create an empty portfolio
 * User can enter the portfolio name
2. Add stock to portfolio
 * User can add a stock to the portfolio by entering:
     i.  the symbol of the stock
     ii. the number of share he/she owns
     iii. the date of purchase
 * There is no limit on the number of stocks a portfolio can contain
3. View portfolio
  * The user can view the purchase value and the current value of the stocks in the portfolio. The current value and the purchase value of the stocks should be fetched from a stock market exchange API. For simplicity, a Refresh button can be used.
  * The user can change the currency between US dollar and Euro when displaying a portfolio (and its stocks). For simplicity, the USD/Euro exchange rate can be hardcoded (not fetched from an API).
  * The user can view the total value of the portfolio and its stocks updated with the latest values in the currently selected currency.
4. Compare stock value performances in a portfolio
  * User can see a graph showing the historic valuation of the stocks
  * User can adjust the time frame to draw the graph from i.e API provides them in 1d,5d,1m, 3m,1y and 5y format.
5. Remove stock –A user can remove individual stocks from a portfolio.
6. Remove a portfolio
  * The user can delete a portfolio
  * When deleting a portfolio all associated stocks should be removed.
7. The portfolios are persistent over browser sessions
  * The persistent local storage method is used to save all data(portfolios, stocks, number of shares, initial values, latest values, and latest historical values)related to the created portfolios. That is, after closing and opening the browser the portfolio information should still be available regardless of having internet connection.

#### Resources used

* ReactJs
* Currency exchange rates, stock prices and historical prices are available via the following API: https://iexcloud.io/docs/api/
* For creating graphs, http://recharts.org/

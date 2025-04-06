import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function MutualFundList() {
  const mutualFunds = [
    {
      name: "SBI Blue Chip Fund",
      category: "Large Cap",
      nav: "58.75",
      oneYearReturn: "15.8%",
      threeYearReturn: "12.5%",
      fiveYearReturn: "10.2%",
    },
    {
      name: "Axis Midcap Fund",
      category: "Mid Cap",
      nav: "72.34",
      oneYearReturn: "18.2%",
      threeYearReturn: "14.7%",
      fiveYearReturn: "12.8%",
    },
    {
      name: "HDFC Small Cap Fund",
      category: "Small Cap",
      nav: "65.90",
      oneYearReturn: "22.5%",
      threeYearReturn: "16.3%",
      fiveYearReturn: "13.5%",
    },
    {
      name: "Mirae Asset Emerging Bluechip",
      category: "Large & Mid Cap",
      nav: "98.45",
      oneYearReturn: "17.6%",
      threeYearReturn: "15.2%",
      fiveYearReturn: "13.1%",
    },
    {
      name: "Aditya Birla Sun Life Tax Relief 96",
      category: "ELSS",
      nav: "45.67",
      oneYearReturn: "16.9%",
      threeYearReturn: "13.8%",
      fiveYearReturn: "11.7%",
    },
  ]

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">NAV (₹)</TableHead>
            <TableHead className="text-right">1Y Return</TableHead>
            <TableHead className="text-right">3Y Return</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mutualFunds.map((fund, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{fund.name}</TableCell>
              <TableCell>{fund.category}</TableCell>
              <TableCell className="text-right">{fund.nav}</TableCell>
              <TableCell className="text-right text-green-500">{fund.oneYearReturn}</TableCell>
              <TableCell className="text-right text-green-500">{fund.threeYearReturn}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button variant="outline">View All Mutual Funds</Button>
      </div>
    </div>
  )
}


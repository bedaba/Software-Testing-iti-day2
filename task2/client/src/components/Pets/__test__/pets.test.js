import { render,screen ,within} from "@testing-library/react";
import Pets from "../Pets";
import { rest } from "msw";
import{setupServer} from 'msw/node'
import catsMock from '../../../mocks/cats.json'
import userEvent from "@testing-library/user-event";



const server=setupServer(
    rest.get("http://localhost:4000/cats",(req,res,ctx)=>{
        return res(ctx.status(200),ctx.json(catsMock))
    })
)

describe("Here we Test Pets component",()=>{

 beforeAll(()=>{
     server.listen()
 })

 afterAll(()=>{
     server.close()
 })

 beforeEach(()=>{
     render(<Pets />)
 })

 afterEach(()=>{
     server.resetHandlers()
 })

  test('should render 5 cards',async()=>{
      const cards=await screen.findAllByRole("article")
      expect(cards.length).toEqual(5)
  }) 

  test('should render based on filter for male cats only',async()=>{
      const cards=await screen.findAllByRole("article")
      userEvent.selectOptions(screen.getByLabelText(/gender/i),"female")
      expect(screen.getAllByRole("article")).toStrictEqual([cards[0],cards[2],cards[4]])
      
  }) 
  test('should render based on filter for favourite cats only',async()=>{
      const cards=await screen.findAllByRole("article")
      userEvent.click(within(cards[2]).getByRole('button'))
      userEvent.selectOptions(screen.getByLabelText(/Favourite/i),"Favoured")
      expect(screen.getAllByRole("article")).toStrictEqual([cards[2]])
      
  }) 
    test('should render based on filter for favourite cats only and female cats',async()=>{
        const cards=await screen.findAllByRole("article")
        // userEvent.click(within(cards[3]).getByRole('button'))
        // userEvent.selectOptions(screen.getByLabelText(/Favourite/i),"Favoured")
        // userEvent.click(within(cards[4]).getByRole('button'))
        // userEvent.selectOptions(screen.getByLabelText(/Favourite/i),"Favoured")
        userEvent.click(within(cards[2]).getByRole('button'))
        userEvent.selectOptions(screen.getByLabelText(/Favourite/i),"Favoured")
        userEvent.selectOptions(screen.getByLabelText(/gender/i),"female")
        expect(screen.getAllByRole("article")).toStrictEqual([cards[2]])
    }) 

})
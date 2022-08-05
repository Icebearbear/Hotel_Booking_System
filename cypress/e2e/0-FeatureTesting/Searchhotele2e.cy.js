import fuzzur from 'fuzzur';
import { addition } from '@thecollinslagat/text-fuzzer'

describe('User input search check navigation', ()=>{
    // fuzz input 
     
    const list = [];
    for(let i = 0; i < 10; i++){
        list.push(fuzzur.mutate('Rome, Italy', {
            string: {
                sampleSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // The set of chars from which the mutated strings are built, can be overriden with custom sets
                randomisationPasses: 1 // The maximum number of randomisation passes that are done on each string, a random number between 1 and this
            }}))
    }
    const permute = addition('Rome, Italy')


    beforeEach(() => {
        cy.viewport(1280, 720)
        // arrange

        cy.visit('http://localhost:3000/');
        cy.wait(1000);
    })

    it('fuzz search and checks if option is there', ()=>{
        cy.wrap(list).each((perm) => {
            cy.get('[data-cy = "search destination"]').type(perm).wait(700);
            cy.get('[data-cy = "destination"]').should("exist");
            cy.get('[data-cy = "search destination"]').type('{selectAll}{backspace}').wait(700);
        })
    })

})
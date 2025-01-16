todo: 

    check to see if when I am booking a reservation, if when I delete a person 
    does it stall and wait for the booking to be done before it can grab the flight?

    look at anti-corruption layer and see if I'm doing it right

    implement the rest of the functionality
        implement other commands
        implement CQRS for retrieval of information

    UX/UI and eventual consistency compensating actions

    the only thing bothering me is the HTTP request we are using... 
        should we set it up so that its an event fired after the reservation is booked?
        should we do request/response via rabbitmq?
    


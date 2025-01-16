todo: 

    remove the HTTP request, and turn it into a long running process that checks to see if the user exists after the reservation has been made --> this solves the problem

    look at anti-corruption layer and see if I'm doing it right

    implement the rest of the functionality
        implement other commands
        implement CQRS for retrieval of information

    UX/UI and eventual consistency compensating actions

    the only thing bothering me is the HTTP request we are using... 
        should we set it up so that its an event fired after the reservation is booked?
        should we do request/response via rabbitmq?
    


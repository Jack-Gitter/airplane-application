testing: 
    ensure flight schedules created properly
todo: 

    look at anti-corruption layer and see if I'm doing it right

    implement the rest of the functionality
        implement adding a schedule to a flight
        implement removing a scheudle from a flight 
            eventual consistency domain event (not rabbitmq)
        implement adding segments to a flight
        implement removing segments from a flight
        implement delaying a flight
            add a status to the flight, and set it to "on time" by default
            delay the flight via the schedule, and emit an event (domain event, not rabbitmq) that the aggregate listens on
        implement canceling a flight
            add a status to the flight, and set it to "on time" by default
            delay the flight via the schedule, and emit an event (domain event, not rabbitmq) that the aggregate listens on
        implement CQRS for retrieval of information

    UX/UI and eventual consistency compensating actions

    the only thing bothering me is the HTTP request we are using... 
        should we set it up so that its an event fired after the reservation is booked?
        should we do request/response via rabbitmq?
    


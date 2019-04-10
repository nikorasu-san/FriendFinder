### Seeding

INSERT INTO shows (show_name,score) 
VALUES ("Crazy Ex-Girlfriend", "5,1,3,3,3,4,1,3,3,5"),
("CW Charmed", "3,5,3,2,5,2,4,3,3,2"),
("Brooklyn Nine-Nine", "2,1,3,1,1,2,2,2,1,5"),
("This Is Us","2,1,5,5,5,3,1,3,4,3"),
("The Flash", "4,5,4,3,4,1,4,5,3,1"),
("Umbrella Academy", "2,5,5,3,4,5,5,4,5,1"),
("Kim's Convenience", "1,1,4,2,2,5,1,2,2,5"),
("The Good Place","1,4,3,3,2,5,4,3,5,1"),
("Chilling Adventures of Sabrina","1,5,3,1,4,3,5,4,4,3"),
("Grace and Frankie","3,1,5,3,2,5,1,3,3,5"),
("Schitt's Creek","3,1,5,4,3,5,1,2,3,1"),
("Killing Eve", "1,1,2,1,4,5,5,2,2,1"),
("Insecure","1,1,2,2,3,5,1,1,2,5");

INSERT INTO users (user_name,photo,score,show_name)
VALUES ("James","http://lorempixel.com/400/200/people/","5,1,3,3,3,4,1,3,3,5","Crazy Ex-Girlfriend"),
("Jerry","http://lorempixel.com/400/200/people/","4,5,4,3,4,1,4,5,3,1","The Flash"),
("Brandon","http://lorempixel.com/400/200/people/","1,1,2,2,3,5,1,1,2,5","Insecure"),
("Jessica","http://lorempixel.com/400/200/people/","1,1,2,2,3,5,1,1,2,5","Insecure"),
("Stan","http://lorempixel.com/400/200/people/","1,5,3,1,4,3,5,4,4,3","The Chilling Adventures of Sabrina"),
("Sally","http://lorempixel.com/400/200/people/","1,4,3,3,2,5,4,3,5,1","The Good Place"),
("Vicki","http://lorempixel.com/400/200/people/","1,1,4,2,2,5,1,2,2,5","Kim's Convenience");

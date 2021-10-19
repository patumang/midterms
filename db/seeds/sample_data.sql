INSERT INTO events (creator_name, creator_email, title, description, venue, unique_url)
VALUES ('Lloyd Jefferson', 'asherpoole@gmx.com', 'test event 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus semper neque id rhoncus. Sed tincidunt dictum arcu at semper. Phasellus commodo, tortor nec euismod viverra, nisl diam vehicula risus, eu pulvinar quam velit a quam. Integer vel porta leo. Nam mollis eu orci sit amet elementum. Aliquam lobortis leo at iaculis ullamcorper.', 'TBD', '123456'), --meeting with 2 timings, no visitors
('Devin Sanders', 'tristanjacobs@gmail.com', 'test event 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus semper neque id rhoncus. Sed tincidunt dictum arcu at semper. Phasellus commodo, tortor nec euismod viverra, nisl diam vehicula risus, eu pulvinar quam velit a quam. Integer vel porta leo. Nam mollis eu orci sit amet elementum. Aliquam lobortis leo at iaculis ullamcorper.', 'TBD', '234567'), --meeting with 2 timings, 2 visitors, 2 response
('Iva Harrison', 'allisonjackson@mail.com', 'test event 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus semper neque id rhoncus. Sed tincidunt dictum arcu at semper. Phasellus commodo, tortor nec euismod viverra, nisl diam vehicula risus, eu pulvinar quam velit a quam. Integer vel porta leo. Nam mollis eu orci sit amet elementum. Aliquam lobortis leo at iaculis ullamcorper.', 'TBD', '345678'); --meeting with 4 timings, 3 visitors, 2 response

INSERT INTO visitors (event_id, visitor_name, visitor_email)
VALUES (2, 'Dale Coleman', 'michaelgray@mail.com'),
(2, 'Alejandro Osborne', 'ariaatkinson@outlook.com'),
(3, 'Nell Medina', 'juliansantos@aol.com'),
(3, 'Estelle Walsh', 'elistanton@yahoo.com'),
(3, 'Herbert Graves', 'emilyowen@live.com');

INSERT INTO timings (event_id, date, start_time, end_time)
VALUES (1, '2021-10-17', '13:30', '14:40'),
(1, '2021-10-17', '16:00', '17:00'),
(2, '2021-10-17', '8:00', '10:00'),
(2, '2021-10-17', '10:00', '12:00'),
(3, '2021-10-17', '10:00', '22:00'),
(3, '2021-10-17', '10:30', '22:30'),
(3, '2021-10-17', '11:00', '23:00'),
(3, '2021-10-17', '11:30', '23:30');

INSERT INTO responses (timing_id, visitor_id)
VALUES (3, 1),
(4, 2),
(5, 2),
(5, 4);

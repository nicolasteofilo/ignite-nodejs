## Car Registration

**RF**
- [x] it should be possible to register a car

**RN**

- [x] it should not be possible to create a new car if the license plate is already registered
<!-- - [ ] It shouldn't be possible to change the license plate of a car -->
- [x] it should be possible to register the car with availability by default
- [x] it should be possible to register a car only through the admin
 
## List cars

**RF**
- [x] it should be possible to list the cars that are available
- [x] it should be possible to list available cars by category name
- [x] it should be possible to list available cars by brand name
- [x] it should be possible to list available cars by car name

**RN**
- [x] it should be possible to list cars for non-logged-in users
- [x] It should be possible to list all specifications
- [x] It should be possible to list all cars

## Car specification record

**RF**
- [x] It must be possible to register a specification for a car
- [x] It should not be possible to register a specification for an unregistered car
- [x] It should not be possible to register an existing specification for the same car
- [x] it should be possible to register, only through the admin

## Registration of car images

**RF**
- [x] If it is possible to register the image of the car

**RNF**
- [x] Use multer to upload files

**RN**
- [x] If it is possible to register more than one image for the same car
- [x] If it is possible to register only by admin users

## Rent Scheduling

**RF**
- [x] If it is possible to register a rental

**RN**
- [x] The rental must have a minimum duration of 24 hours
- [x] It should not be possible to register someone if there is already one open for the same user
- [x] It should not be possible to register someone if there is already one open for the same car
- [x] The user must be logged in
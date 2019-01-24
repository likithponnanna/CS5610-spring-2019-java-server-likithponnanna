package com.example.myapp.cs5610Spring2019JavaServerLikithPonnanna.services;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.cs5610Spring2019JavaServerLikithPonnanna.model.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

@RestController
public class UserService {

  private User alice = new User((long) 123, "alice","pass123", "Alice", "Wonderland","FACULTY");
  private User bob = new User((long) 234, "bob","pass245", "Bob", "Marley","STUDENT");
  private ArrayList<User> users = new ArrayList <>(Arrays.asList(alice,bob));

  @GetMapping("/api/user")
  public ArrayList<User> findAllUser(){
    return users;
  }

  @GetMapping("/api/user/{userId}")
  public User findUserById(@PathVariable("userId") Integer id){
    for (User user: users){
      if(id.equals(user.getUserId())){
        return user;
      }
    }
    return null;
  }

  @PostMapping("/api/user")
  public User createUser(@RequestBody User user){
    users.add(user);
    return user;
  }

  @DeleteMapping("/api/user/{userId}")
  public void deleteUser(@PathVariable("userId") Integer id){
    for (User u: users) {
      if (u.getUserId().equals(id)){
        users.remove(u);
      }
    }
  }

  @PutMapping("/api/user/{userId}")
  public User updateUser(@PathVariable("userId") Integer id,@RequestBody User user){
    for (User u: users) {
      if (u.getUserId().equals(id)){
        if (user.getPassword() != null) {
          u.setPassword(user.getPassword());
        }
        if (user.getFirstName() != null) {
          u.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
          u.setLastName(user.getLastName());
        }
        if (user.getUsername() != null) {
          u.setUsername(user.getUsername());
        }
        if (user.getRole() != null) {
          u.setRole(user.getRole());
        }


        return u;
      }
    }
    return null;
  }
}
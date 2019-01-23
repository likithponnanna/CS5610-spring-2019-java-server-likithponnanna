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
  public User findUserById(@PathVariable("userId") Long id){
    for (int i=0;i< users.size();i++){
      if(id.equals(users.get(i).getUserId())){
        return users.get(i);
      }
    }
    return null;
  }

  @PostMapping("/api/user")
  public User createUser(@RequestBody User user){
    users.add(user);
    return user;
  }

  @DeleteMapping("/api/delete/{userId}")
  public void deleteUser(@PathVariable("userId") Long id){
    for (int i = 0; i < users.size(); i++) {
      if (users.get(i).getUserId().equals(id)){
        users.remove(i);
      }
    }
  }

  @PutMapping("/api/update/{userId}")
  public User updateUser(@PathVariable("userId") Long id,@RequestBody User user){
    for (int i=0;i<= users.size();i++) {
      if (users.get(i).getUserId().equals(id)){
        if (user.getPassword() != null) {
          users.get(i).setPassword(user.getPassword());
        }
        if (user.getFirstName() != null) {
          users.get(i).setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
          users.get(i).setLastName(user.getLastName());
        }
        if (user.getUsername() != null) {
          users.get(i).setUsername(user.getUsername());
        }
        if (user.getRole() != null) {
          users.get(i).setRole(user.getRole());
        }


        return users.get(i);
      }
    }
    return null;
  }
}

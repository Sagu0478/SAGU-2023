# To keep everyone in the loop use this page to jot down what you have done
#   - Feature or code that you did
#   - Any changes you have made to your code or someon eleses code
#     (make sure you @ the person who's code you have changed)
#   - Any problems you had and need help with
#   - ANy requests, could be a meeting or a code review, whatever

## git 
#   When you are making changes in your own branch, don't forget to merge it
#   with the main branch:
        - git checkout main
        - git fetch 
        - git pull 
        - git merge <Your branch where you made changes>
        - git branch -d <Your branch where you made changes>
#       You can look into these in more detail on your own. Dani put a link to 
#       a website about git in the group disc

#   You can create your own branch:
        - git checkout -b <Name of branch>
#   Once you have created your branch, you will be automatically switched into your branch
#   you can see the branches and switch to either one. 
        - (to see branches) git branch
        - (to switch branches) git checout <name of branch you want to switch to>

#   Only push once you have merged your changes (that has no errors so it won't brake
#   the build) to the main branch 

#   Also make sure you add a message to your commits that sums up what you did
        - git commit -m "Kurt: Created the initial project scaffholding" 

<!-- Notes here -->
## Kurt: 
    - Created the react project for us to use to create the website
    - Everyone is free to work on their features, just make sure you 
      create and pull into your own branch so that we all can work concurently 
    - Don't forget: make sure you DON'T push a broken build and make clear comments
      so that we can understand your code but not too much comments so all that you are seeing are comments
    


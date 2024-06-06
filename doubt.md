## commit some specific files(this doeasnt do that completely yet)

## this doesnt commit to repo ,puts into the staging area

git add style.css index.htm/else
git add.

git status=>shows what is in staging area

## actually comitting

' '=>represents what this commit is
git commit -m'Initial commit'

## push code from local repo=>remote repo (github)

## gitignore

aloows us to specify which files,folders you dont want in repo

## generate ssh keys=>will allow to push and clone from github easily(without login into github)

ssh-keygen
=>going to create file id_something
name that file, to name the, the key files for what service I'm using.

For instance, I have ID underscore RSA GitHub,

## passphrase

like password

## after this ssh key generated

## ls ~/.ssh (~ represents home directory)

The ls ~/.ssh command is used to list the contents of the .ssh directory in your home directory. This directory typically contains SSH keys and configuration files for SSH connections.

inside this directory=>put the public key on github

//to get that key
//$ pbcopy < ~/.ssh/id_rsa.pub
//instead
//$ cat ~/.ssh/id_ed25519.pub

//git remote add origin https://github.com/shambhavi-2004/shoppingList.git
add this repo as (remote repo) to push to
//we just have 1 main branch(main code) git branch -M main
//after some time if we wanted to add a login page(create a new branch for it)
,after this login work completed,we can merge it with main branch

//for first push to guthub git push -u origin main
//after that for push just use,git push

//if ssh keys denied
//eval `ssh-agent`
//ssh-add ~/.ssh/id_ed25519.pub
//then do first push command again

//later pushes
//first put that code to staging area then commit and then push
git status
git add .
git commit -m 'readded readme'
git push

//readme.md
// Markdown is a lightweight markup language that allows you to create formatted text using a plain-text editor.

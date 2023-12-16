# projet_aaw
Projet AAW : Application React avec l'intégration d'une API discord  

- __Loya Dylan__  
- __Lacaze Yon__  
- __Lespagnol Killian__  
- __Tribouillois Julien__  

#### Commande du bot discord :

- Préfixe du bot : "!mpb "  
Le préfixe est à mettre devant toutes les autres commandes, ne pas oublier l'espace à la fin du préfixe. Si une commande tapée n'existe pas un message d'erreur sera renvoyé par le bot:
```
Commande incorrecte.  
Usage: !mpb quotes <auteur>
```
 - __Avoir toutes les citations du site__ : ``!mpb quotes``  
 La commande __quotes__ peut être suivi d'un auteur afin d'avoir toutes les citations de cet auteur (exemple : ``!mpb quotes zaiphyr3993``).  
 Si il n'y a pas de citation ce message apparaîtra : "Aucunes citations disponibles" et si c'est un auteur en particulier qui n'a pas de citations ce sera : "Aucune citation de cet auteur".

 - __Avoir sa liste de favoris__ : ``!mpb favorites``, si l'utilisateur n'a pas de favoris ce message sera renvoyé : "Aucune citation favorite".  

 - __Ajouter une citation__ : ``!mpb addquote ``  
 La commande addquote doit être suivie de la citation à ajouter, le bot renverra un message : "Ajout réussi !" quand la citation sera ajouté à la base de données. Ne pas l'oublier l'espace après le "addquote".  

#### Message d'erreur : 
Les messages d'erreurs apparaissent sur le site dans les situations suivantes:  
- __Erreur de favoris__:  
  - Suppression : "Il y a eu une erreur pendant la suppression du favoris."  
  - Ajout : "Il y a eu une erreur pendant la création du favoris."  
  - Récupérer ses citations favorites : "Il y a eu une erreur pendant la récupération des favoris."  
- __Erreur de recherche des citations__ : "Il y a eu une erreur pendant la recherche."

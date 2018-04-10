<VirtualHost *:80>
  ServerName <MBRWP_SERVER_NAME>
  DocumentRoot /var/www/web/
  Options Indexes FollowSymLinks

  <Directory "/var/www/web/">
    AllowOverride All
    <IfVersion < 2.4>
      Allow from all
    </IfVersion>
    <IfVersion >= 2.4>
      Require all granted
    </IfVersion>
  </Directory>

  # The following lines prevent .htaccess and .htpasswd files from being 
  # viewed by Web clients. 
  #
  <FilesMatch "^\.([Hh][Tt]|[Dd][Ss]_[Ss])">
      Order allow,deny
      Deny from all
      Satisfy All
  </FilesMatch>

</VirtualHost>

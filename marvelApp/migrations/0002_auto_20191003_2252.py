# Generated by Django 2.1.11 on 2019-10-03 22:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marvelApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movie',
            old_name='fav_character',
            new_name='favorite_character',
        ),
    ]

# Generated by Django 2.1.11 on 2019-10-04 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marvelApp', '0008_remove_character_ability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='affiliation',
            field=models.CharField(choices=[(True, 'Hero'), (False, 'Villain')], default=True, max_length=7),
        ),
    ]

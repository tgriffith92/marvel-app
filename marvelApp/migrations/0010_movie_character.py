# Generated by Django 2.1.11 on 2019-10-08 19:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('marvelApp', '0009_auto_20191004_1815'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='character',
            field=models.ForeignKey(default=True, on_delete=django.db.models.deletion.CASCADE, related_name='characters', to='marvelApp.Character'),
        ),
    ]
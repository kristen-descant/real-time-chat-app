# Generated by Django 4.2.4 on 2023-09-12 18:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts_app', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime.today),
        ),
    ]

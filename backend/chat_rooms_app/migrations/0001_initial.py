# Generated by Django 4.2.4 on 2023-08-31 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatRoom',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

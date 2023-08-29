# Generated by Django 4.2.4 on 2023-08-29 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('content', models.TextField()),
                ('reaction', models.CharField(max_length=255)),
            ],
        ),
    ]

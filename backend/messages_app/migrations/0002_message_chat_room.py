# Generated by Django 4.2.4 on 2023-08-30 21:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat_rooms_app', '0001_initial'),
        ('messages_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='chat_room',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat_rooms_app.chatroom'),
            preserve_default=False,
        ),
    ]
